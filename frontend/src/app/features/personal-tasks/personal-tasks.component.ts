import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'personal-tasks',
    templateUrl: 'personal-tasks.component.html',
    styles: [`
    .wrapper {
        display: flex;
        flex-direction: row;
        justify-content: center;
        flex-wrap: nowrap;
    }
    .wrapper > div {
        width: 33.33333333%
    }
    `]
})

export class PersonalTasksComponent implements OnInit {
    constructor() { }

    ngOnInit() { }
}