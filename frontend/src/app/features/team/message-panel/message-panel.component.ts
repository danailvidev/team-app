import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'message-panel',
    template: `<mat-sidenav-content>
    <span>ada</span>
    </mat-sidenav-content>
    <user-panel></user-panel>`,
    styleUrls: ['styles.scss']
})

export class MessagePanelComponent implements OnInit {
    constructor() { }

    ngOnInit() { }
}