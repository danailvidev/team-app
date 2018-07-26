import { Event } from './event';

export abstract class SocketService {
    abstract initSocket();
    abstract onMessage();
    abstract send(message: any): void;
    abstract addUser(username);
    abstract onEvent(event: Event);
}
