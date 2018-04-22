import { Component, OnInit } from '@angular/core';
import { SocketService, Action, Event } from '@services/socket.service';
import { Store } from '@ngrx/store';
import { AppState } from '../../../shared/interfaces/app-state';
import { ApiService } from '@services/api.service';
import { NotifyService } from '@services/notify.service';
import { Subscription } from 'rxjs/Subscription';

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
    msgHistory: any[] = [];
    private subscriptions = new Subscription();

    constructor(
        private socketService: SocketService,
        private store: Store<AppState>,
        private apiService: ApiService,
        private notifyService: NotifyService) { }

    ngOnInit() {
        this.getCurrentUser();
        this.initIoConnection();
        this.getMessagesFromDb();
    }

    private initIoConnection(): void {
        this.socketService.initSocket();

        this.ioConnection = this.socketService.onMessage()
            .subscribe((message: any) => {
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
        this.messages.push({
            message: message,
            username: this.currentUser.email,
            dateCreated: new Date()
        });
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
        this.subscriptions.add(this.store.select(state => state.currentUser).subscribe(res => {
            this.currentUser = res.currentUser;
        }, (err) => {
            this.notifyService.notify(err, null, {
                duration: 4000,
                panelClass: ['snack-denied']
            });
            console.log(err);
        }));
    }

    private getMessagesFromDb() {
        this.subscriptions.add(this.apiService.getChatMessages().subscribe(data => {
            this.msgHistory = data;
            this.msgHistory.forEach((msg: any) => {
                this.messages.push({
                    message: msg.content,
                    username: msg.authorEmail,
                    dateCreated: msg.dateCreated
                });
            });
        }, (err) => {
            this.notifyService.notify(err, null, {
                duration: 4000,
                panelClass: ['snack-denied']
            });
            console.log(err);
        }));
    }
}
