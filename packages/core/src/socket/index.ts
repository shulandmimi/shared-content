export { default as WSSocket } from './ws';

export abstract class AbstractSocketInstance {
    abstract send(buffer: any): void;

    abstract close(): void;

    abstract on(event: string, handler: any): void;

    abstract off(event: string, handler: any): void;

    abstract emit(event: string, ...arg: any): void;
}

export default class Socket implements AbstractSocketInstance {
    socket: AbstractSocketInstance;
    constructor(instance: AbstractSocketInstance) {
        this.socket = instance;
    }
    close(): void {
        this.socket.close();
    }
    emit(event: string, ...arg: any): void {
        this.socket.emit(event, ...arg);
    }

    send(data: any) {
        this.socket.send(data);
    }

    on(eventName: string, handler: any): void {
        this.socket.on(eventName, handler);
    }

    off(eventName: string, handler: () => void) {
        this.socket.off(eventName, handler);
    }
}
