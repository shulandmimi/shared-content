import WebSocket from 'ws';

import { AbstractSocketInstance } from './index';
interface SocketOptions {
    protocol?: 'ws' | 'wss';
    host: string;
    port?: number;
    path?: string;
}
export default class WSSocket implements AbstractSocketInstance {
    socket: WebSocket;
    constructor(options: SocketOptions) {
        const WSUrl = `${options.protocol ?? 'ws'}://${options.host}${options.port ? ':' + options.port : ''}/${options.path ?? ''}`;
        this.socket = new WebSocket(WSUrl);
    }
    close(): void {
        this.socket.close();
    }

    on(event: string, handler: any): void {
        this.socket.on(event, handler);
    }

    off(event: string, handler: () => void): void {
        this.socket.off(event, handler);
    }
    emit(event: string, ...arg: any): void {
        this.socket.emit(event, ...arg);
    }

    send(buffer: any) {
        this.socket.send(buffer);
    }
}
