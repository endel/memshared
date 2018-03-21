import * as cluster from "cluster";
import * as commands from "./commands";

import { Store, Message } from "./Store";
import { ChildProcess } from "child_process";

export { Store } // export type
export const store = new Store();

let processesById: {[processId: number]: ChildProcess} = {};

function masterHandleIncomingMessage (processId: number, message: Message) {
    if (!message || !commands[message.cmd]) { return; }

    // run command in master
    try {
        message.result = commands[message.cmd].apply(undefined, message.args);

    } catch (e) {
        message.error = e.message;
    }

    // delete irrelevant data to send back to the worker
    delete message['args'];

    // send result back to worker
    processesById[ processId ].send(message);
}

function workerHandleIncomingMessage (message: Message) {
    if (!message || !commands[message.cmd]) {
        return;
    }

    if (message.messageId) {
        store.consume(message);

    } else if (message.pubsub) {
        commands[message.cmd].apply(undefined, message.args);
    }
}

if (isMasterNode()) {
    // Setup existing workers
    Object.keys(cluster.workers).forEach((workerId) => {
        registerProcess(cluster.workers[workerId].process);
    });

    // Listen for new workers to setup
    cluster.on("fork", (worker) => registerProcess(worker.process));

    // Be notified when worker processes die.
    cluster.on('exit', function(worker, code, signal) {
        delete processesById[ worker.process.pid ];
    });

} else {
    process.on("message", workerHandleIncomingMessage);
}

export function isMasterNode () {
    return (!process.send);
}

export function getProcessById(processId: number): ChildProcess {
    return processesById[ processId ];
}

export function registerProcess (childProcess: ChildProcess) {
    processesById[ childProcess.pid ] = childProcess;
    childProcess.on("message", (message: Message) => masterHandleIncomingMessage(childProcess.pid, message));
}

export function setup (data: any) {
    Object.assign(store, data);
}

//
// Export commands
//
export * from "./commands";
