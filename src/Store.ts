import { getProcessId } from "./";

export interface Message {
    cmd: string,
    args?: any[],
    messageId?: string,
    result?: any,
    error?: any,
    pubsub?: boolean
};

let messageId: number = 0;

export class Store {
    private $callbacks: {[messageId: string]: Function} = {};

    dispatch (cmd: string, callback: Function, ...args: any[]) {
        let msg = this.buildMessage(cmd, ...args);

        // callback when the worker receives back the final result
        if (callback) {
            this.$callbacks[msg.messageId] = callback;
        }

        if (process.env.pm_id === undefined) {
            // send command to be executed by the master node
            process.send(msg);

        } else {
            // PM2: send command to PM2's launchBus
            // (http://pm2.keymetrics.io/docs/usage/pm2-api/#send-message-to-process)
            process.send({
                type: "memshared",
                topic: "memshared",
                data: msg,
            });
        }
    }

    consume (message: Message) {
        if (this.$callbacks[ message.messageId ]) {

            // dispatch callback
            this.$callbacks[ message.messageId ]( message.error, message.result );

            // cleanup
            if (!message.pubsub) {
                delete this.$callbacks[message.messageId];
            }
        }
    }

    buildMessage(command: string, ...args: any[]): Message {
        return {
            messageId: `${ getProcessId() }:${ messageId++ }`,
            cmd: command,
            args: args
        }
    }
}