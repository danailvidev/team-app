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

    ngOnDestroy() {
        this.subscriptions.unsubscribe();
    }
}
