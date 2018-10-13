import { Component, OnInit, HostBinding } from '@angular/core';
import { OverlayContainer } from '@angular/cdk/overlay';
import { AuthService } from './core/auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    navigation = [
        { link: 'payment', label: 'Payment', color: '', icon: 'payment' },
        { link: 'github', label: 'GitHub Issues', color: '', icon: 'code' },
        { link: 'team', label: 'Team Service', color: '', icon: 'share' },
        { link: 'users', label: 'Users', color: '', icon: 'people' },
        { link: 'calendar', label: 'Calendar', color: '' , icon: 'calendar_today'}
    ];
    theme = 'light-theme';

    @HostBinding('class') componentCssClass;

    constructor(
        public auth: AuthService,
        private router: Router,
        public overlayContainer: OverlayContainer) {

    }

    ngOnInit() {
        this.setTheme(this.theme);
    }

    setTheme(theme) {
        this.theme = this.componentCssClass = theme;
        this.overlayContainer.getContainerElement().classList.add(theme);
    }

    switchTheme(event) {
        this.overlayContainer.getContainerElement().classList.remove(this.theme);
        event.checked === true ? this.setTheme('black-theme') : this.setTheme('light-theme');
    }

    logout() {
        const isLoggedOut = this.auth.logout();
        if (isLoggedOut) {
            this.router.navigate([`/login`]);
        }
    }
}
