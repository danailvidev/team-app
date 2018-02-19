import { Component, OnInit } from '@angular/core';
import { SocketService, Action, Event } from '../../../core/socket.service';
import { Store } from '@ngrx/store';
import { AppState } from '../../../shared/interfaces/app-state';


@Component({
    selector: 'ta-message-panel',
    templateUrl: 'message-panel.component.html',
    styleUrls: ['message-panel.component.scss']
})

export class MessagePanelComponent implements OnInit {
    action = Action;
    currentUser: any;
    messages: any[] = [];
    messageContent: string;
    ioConnection: any;

    constructor(
        private socketService: SocketService,
        private store: Store<AppState>) { }

    ngOnInit() {
        this.getCurrentUser();
        this.initIoConnection();
    }

    private initIoConnection(): void {
        this.socketService.initSocket();

        this.ioConnection = this.socketService.onMessage()
            .subscribe((message: any) => {
                console.log('msg', message);
                this.messages.push(message);
            });

        this.socketService.onEvent(Event.CONNECT)
            .subscribe(() => {
                console.log('connected');
            });

        this.socketService.onEvent(Event.DISCONNECT)
            .subscribe(() => {
                console.log('disconnected');
            });

        this.socketService.addUser(this.currentUser);
    }

    public sendMessage(message: string): void {
        if (!message) {
            return;
        }

        this.socketService.send({
            from: this.currentUser,
            content: message
        });
        this.messages.push({message: message, username: this.currentUser});
        this.messageContent = null;
    }

    public sendNotification(params: any, action: Action): void {
        let message: any;

        if (action === Action.JOINED) {
            message = {
                from: this.currentUser,
                action: action
            };
        } else if (action === Action.RENAME) {
            message = {
                action: action,
                content: {
                    username: this.currentUser.name,
                    previousUsername: params.previousUsername
                }
            };
        }

        this.socketService.send(message);
    }

    private getCurrentUser() {
        this.store.select(state => state.currentUser).subscribe(res => {
            this.currentUser = res.currentUser.email;
        }, (err) => {
            console.log(err);
        });
    }
}
