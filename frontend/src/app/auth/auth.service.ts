import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {

    constructor(
        private router: Router) {
    }

    login() {
        console.log('login');
        this.router.navigate([`/login`]);
    }

    logout() {
        console.log('logout');
        this.router.navigate([`/login`]);
    }
}
