import { Component, OnInit, AfterViewInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '@env/environment';

@Component({
    selector: 'ta-payment',
    templateUrl: 'payment.component.html',
    styles: [`
    .wrapper {
        width: 500px;
    }
    .example-card {
        max-width: 400px;
        margin: 20px;
      }
      
      `]
})

export class PaymentComponent implements OnInit, AfterViewInit {
    protected baseUrl = environment.backend['baseUrl'];

    constructor(private http: HttpClient) { }

    ngOnInit() {

    }

    ngAfterViewInit() {
        this.initStripeForm();

    }

    private initStripeForm() {
        let stripe = (<any>window).Stripe('pk_test_SjEe2QocKuRXLmoL7A78NEWr');
        let elements = stripe.elements();
        var style = {
            base: {
                color: '#32325d',
                lineHeight: '18px',
                fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
                fontSmoothing: 'antialiased',
                fontSize: '16px',
                '::placeholder': {
                    color: '#aab7c4'
                }
            },
            invalid: {
                color: '#fa755a',
                iconColor: '#fa755a'
            }
        };

        let card = elements.create('card', { style: style,  hidePostalCode: true});
        card.mount('#card-element');

        // Handle real-time validation errors from the card Element.
        card.addEventListener('change', (event) => {
            var displayError = document.getElementById('card-errors');
            if (event.error) {
                displayError.textContent = event.error.message;
            } else {
                displayError.textContent = '';
            }
        });

        // Handle form submission.
        let form = document.getElementsByTagName("form")[0];
        form.addEventListener('submit', (event) => {
            event.preventDefault();

            stripe.createToken(card).then((result) => {
                if (result.error) {
                    // Inform the user if there was an error.
                    var errorElement = document.getElementById('card-errors');
                    errorElement.textContent = result.error.message;
                } else {
                    // Send the token to your server.
                    this.chargeCard(result.token);
                }
            });
        });
    }


    private chargeCard(token: any) {
        let amount = 555;

        this.http.post(this.baseUrl + 'stripe', { token, amount })
            .subscribe(resp => {
                console.log(resp);
            })
    }
}