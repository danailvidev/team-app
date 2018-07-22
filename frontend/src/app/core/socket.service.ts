import { Injectable } from '@angular/core';
import {  Observable } from 'rxjs';
import { environment } from '@env/environment';
import * as socketIo from 'socket.io-client';

const SOCKET_SERVER_URL = environment.SOCKET_SERVER_URL;

// Actions you can take on the App
export enum Action {
    JOINED,
    LEFT,
    RENAME
}

// Socket.io events
export enum Event {
    CONNECT = 'connect',
    DISCONNECT = 'disconnect'
}

export abstract class SocketService {
    abstract initSocket();
    abstract onMessage();
    abstract send(message: any): void;
    abstract addUser(username);
    abstract onEvent(event: Event);
}

@Injectable()
export class SocketIOService extends SocketService {
    private socket;

    public initSocket(): void {
        this.socket = socketIo(SOCKET_SERVER_URL);
    }

    public send(message: any): void {
        this.socket.emit('new message', message);
    }

    public onMessage(): Observable<any> {
        return new Observable<any>(observer => {
            this.socket.on('message', (data: any) => {
                observer.next(data);
            });
        });
    }

    public addUser(username): void {
        this.socket.emit('add user', username);
    }

    public onEvent(event: Event): Observable<any> {
        return new Observable<Event>(observer => {
            this.socket.on(event, () => observer.next());
        });
    }
}
