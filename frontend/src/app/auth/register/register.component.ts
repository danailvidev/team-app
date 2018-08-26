import { Component, OnDestroy } from '@angular/core';
import { User } from '@app/auth/user.model';
import { AuthService } from '@app/core/auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { FormControl, Validators } from '@angular/forms';
import { CustomErrorStateMatcher } from '@app/shared/validations/custom-error-state-matcher';
import { NotifyService } from '@app/core/notify.service';

@Component({
    selector: 'ta-app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnDestroy {
    public user = new User();
    errorMsg = 'error';
    private subscriptions = new Subscription();

    emailFormControl = new FormControl('', [
        Validators.required,
        Validators.email,
    ]);

    passwordFormControl = new FormControl('', [
        Validators.minLength(5),
        Validators.required,
        Validators.pattern(/\d/)
    ]);

    matcher = new CustomErrorStateMatcher();

    constructor(
        private authService: AuthService,
        private router: Router,
        private notifyService: NotifyService
    ) {

    }

    register() {
        this.subscriptions.add(this.authService.registerUser(this.user).subscribe(res => {
            if (res) {
                this.router.navigate(['/team']);
            }
        }, (err) => {
            this.notifyService.notify(err.error.message, null, {
                duration: 4000,
                panelClass: ['snack-denied']
            });
        }));
    }

    enterAsGuest() {
        const min = 10000;
        const max = 99999;
        const num = Math.floor(Math.random() * (max - min + 1)) + min;
        const randomUser = new User();
        randomUser.email = `Guest${num}@guest${num}.com`;
        randomUser.password = `Password${num}`;
        randomUser.name = `Guest${num}`;
        randomUser.description = `Guest ${num}`;
        this.subscriptions.add(this.authService.registerUser(randomUser).subscribe(res => {
            if (res) {
                this.router.navigate(['/team']);
            }
        }));
    }

    ngOnDestroy() {
        this.subscriptions.unsubscribe();
    }
}
