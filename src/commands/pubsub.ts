import { store, isMasterNode, getProcessById } from "../";
import { ArrayCallback, Callback } from "../callbacks";

const subscriptions: {[topic: string]: Function[]} = {};
const masterSubscriptions: {[topic: string]: number[]} = {};

/*
 * SUBSCRIBE
 * Subscribe to one channel, with the provided callback
 */
export function subscribe (topic: string, callback: Function) {
    if (!isMasterNode()) {
        if (!subscriptions[topic]) { subscriptions[topic] = []; }

        subscriptions[topic].push(callback);

        store.dispatch("subscribe", undefined, topic, process.pid);

    } else {
        if (!masterSubscriptions[topic]) { masterSubscriptions[topic] = []; }

        // "callback" is actually the process id here.
        masterSubscriptions[topic].push(<any>callback);
    }
}

/*
 * UNSUBSCRIBE
 * Unsubscribe from one channel. Callback is optional.
 */
export function unsubscribe (topic: string, callback?: Function) {
    if (!isMasterNode()) {
        let hasCallback = (callback !== undefined);

        if (subscriptions[topic]) {
            if (hasCallback) {
                let index = subscriptions[topic].indexOf(callback);
                if (index !== -1) {
                    subscriptions[topic].splice(index, 1);
                }

            } else {
                delete subscriptions[topic];
            }
        }

        store.dispatch("unsubscribe", undefined, topic, hasCallback, process.pid);

    } else {
        const hasCallback: boolean = <any>callback;
        const processId = arguments[2];

        if (hasCallback) {
            let index = masterSubscriptions[topic].indexOf(processId);
            if (index !== -1) {
                masterSubscriptions[topic].splice(index, 1);
            }

        } else {
            delete masterSubscriptions[topic];
        }
    }
}

/*
 * PUBLISH channel message
 * Publish a message to an specific channel
 */
export function publish (topic: string, message: any, isDispatching: boolean = true) {
    if (!isMasterNode()) {
        console.log("WORKER RECEIVED 'publish'");
        if (isDispatching) {
            store.dispatch("publish", undefined, topic, message);

        } else {
            subscriptions[topic].forEach(c => c(message));
        }

    } else {
        console.log("MASTER RECEIVED 'publish'");
        if (masterSubscriptions[topic]) {
            masterSubscriptions[topic].forEach(processId => {
                console.log("LETS PUBLISH", processId);
                const worker = getProcessById(processId);
                console.log("WORKER:", worker);
                worker.send({
                    cmd: "publish",
                    args: [topic, message, false],
                    pubsub: true
                });
            });
        }
    }
}