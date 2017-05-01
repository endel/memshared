import * as cluster from "cluster";
import * as commands from "./commands";

import { Store, Message } from "./Store";

export const store = new Store();

let workersById: {[workerId: number]: cluster.Worker} = {};

function masterHandleIncomingMessage (workerId: number, message: Message) {
    if (!message || !commands[message.cmd]) { return; }

    // run command in master
    message.result = commands[message.cmd].apply(undefined, message.args);

    // delete irrelevant data to send back to the worker
    delete message['args'];

    // send result back to worker
    workersById[ workerId ].send(message);
}

function workerHandleIncomingMessage (message: Message) {
    if (!message || !commands[message.cmd]) {
        return;
    }

    store.consume(message);
}

function addWorker (worker: cluster.Worker) {
    let pid = worker.process.pid;

    workersById[ pid ] = worker;

    worker.on("message", (message: Message) => masterHandleIncomingMessage(pid, message));
}

if (cluster.isMaster) {
    // Setup existing workers
    Object.keys(cluster.workers).forEach((workerId) => addWorker(cluster.workers[workerId]));

    // Listen for new workers to setup
    cluster.on("fork", (worker) => addWorker(worker));

    // Be notified when worker processes die.
    cluster.on('exit', function(worker, code, signal) {
        delete workersById[ worker.process.pid ];
    });

} else {
    process.on("message", workerHandleIncomingMessage);
}

export function setup (data: any) {
    Object.assign(store, data);
}

//
// Export commands
//
export * from "./commands";
