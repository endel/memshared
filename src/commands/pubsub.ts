import { store, isMasterNode, getProcessById } from "../";
import { ArrayCallback, Callback } from "../callbacks";

interface ProcessSubscription {
    pid: number,
    callback: Function
};

const subscriptions: {[topic: string]: Function[]} = {};
const masterSubscriptions: {[topic: string]: ProcessSubscription[]} = {};

/*
 * HDEL key field [field ...]
 * Delete one or more hash fields
 */
export function subscribe (topic: string, callback: Function, processId?: number) {
    if (!isMasterNode()) {
        if (!subscriptions[topic]) {
            subscriptions[topic] = [];
        }
        store.dispatch("subscribe", callback, topic, undefined, process.pid);

    } else {
        console.log("MASTER IS SUBSCRIBING TO", topic);
        if (!masterSubscriptions[topic]) {
            masterSubscriptions[topic] = [];
        }

        masterSubscriptions[topic].push({
            pid: processId,
            callback: (message) => store.dispatch("perform_publish", undefined, topic, message)
        });
    }
}

export function perform_publish (topic, message) {
    if (!isMasterNode()) {
        console.log("WORKER: PERFORM PUBLISH!");
        subscriptions[topic].forEach(f => f(message));

    } else {
        console.log("MASTER: PERFORM PUBLISH!");
    }
}

/*
 * HDEL key field [field ...]
 * Delete one or more hash fields
 */
export function publish (topic: string, message: any) {
    if (!isMasterNode()) {
        store.dispatch("publish", undefined, topic, message);

    } else {
        console.log("MASTER WILL PUBLISH ON", topic, message);

        if (masterSubscriptions[topic]) {
            masterSubscriptions[topic].forEach(subscription => {
                const worker = getProcessById(subscription.pid);

                worker.send({
                    messageId: null,
                    cmd: "perform_publish",
                    args: [topic, message],
                    pubsub: true
                });
            });

        } else {
            console.warn(`No subscribers for topic: ${topic}`);
        }
    }
}