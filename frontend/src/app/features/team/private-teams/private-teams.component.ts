import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'ta-private-teams',
    template: `
    <ta-message-panel></ta-message-panel>
    <ta-user-panel></ta-user-panel>
    `
})

export class PrivateTeamsComponent implements OnInit {
    constructor() { }

    ngOnInit() { }
}