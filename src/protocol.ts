let messageId: number = 0;

export interface Message {
    messageId: string,
    cmd: string,
    args?: any[],
    result?: any,
};

export function buildMessage(command: string, ...args: any[]): Message {
    return {
        messageId: `${ process.pid }:${ messageId++ }`,
        cmd: command,
        args: args
    }
}
