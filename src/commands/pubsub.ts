import { store, isMasterNode, pm2, getProcessById, getProcessId } from "../";
import { ArrayCallback, Callback } from "../callbacks";

const subscriptions: {[topic: string]: Function[]} = {};
const masterSubscriptions: {[topic: string]: number[]} = {};

export function pubsub (topic: string, callback: Function) {
    if (!isMasterNode()) {
        store.dispatch("pubsub", callback, topic);

    } else {
        return masterSubscriptions[topic];
    }
}

/*
 * SUBSCRIBE
 * Subscribe to one channel, with the provided callback
 */
export function subscribe (topic: string, callback: Function) {
    if (!isMasterNode()) {
        if (!subscriptions[topic]) { subscriptions[topic] = []; }

        subscriptions[topic].push(callback);

        store.dispatch("subscribe", undefined, topic, getProcessId());

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

        store.dispatch("unsubscribe", undefined, topic, hasCallback, getProcessId());

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
        if (isDispatching) {
            store.dispatch("publish", undefined, topic, message);

        } else {
            subscriptions[topic].forEach(c => c(message));
        }

    } else {
        if (masterSubscriptions[topic]) {
            masterSubscriptions[topic].forEach(processId => {
                const data = {
                    cmd: "publish",
                    args: [topic, message, false],
                    pubsub: true
                };

                if (pm2) {
                    pm2.sendDataToProcessId({
                        type: 'memshared',
                        data: data,
                        id: processId,
                        topic: 'memshared'
                    }, function (err, res) {
                        if (err) {
                            console.error("memshared: couldn't send message to worker.");
                        }
                    });

                } else {
                    getProcessById(processId).send(data);
                }
            });
        }
    }
}