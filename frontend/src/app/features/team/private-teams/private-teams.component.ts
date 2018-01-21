import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'private-teams',
    template: `
    <message-panel></message-panel>
    <user-panel></user-panel>
    `
})

export class PrivateTeamsComponent implements OnInit {
    constructor() { }

    ngOnInit() { }
}