import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'ta-payment',
    templateUrl: 'payment.component.html',
    styles: [`
    .wrapper {
        padding: 20px;
        display: flex;
        justify-content: start;
        flex-wrap: wrap;
    }
    .example-card {
        max-width: 400px;
        margin: 20px;
      }`]
})

export class PaymentComponent implements OnInit {
    constructor() { }

    ngOnInit() { }
}