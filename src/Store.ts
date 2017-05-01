import { Message, buildMessage } from "./protocol";

export class Store {
    private $callbacks: {[messageId: string]: Function} = {};

    dispatch (cmd: string, callback: Function, ...args: any[]) {
        let msg = buildMessage(cmd, ...args);

        // callback when the worker receives back the final result
        this.$callbacks[msg.messageId] = callback;

        // send command to be executed by the master node
        process.send(msg);
    }

    consume (message: Message) {
        // dispatch callback
        this.$callbacks[ message.messageId ]( message.result );

        // cleanup
        delete this.$callbacks[ message.messageId ];
    }
}
