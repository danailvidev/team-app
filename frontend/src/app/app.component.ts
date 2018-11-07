import { Component, OnInit, HostBinding, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { OverlayContainer } from '@angular/cdk/overlay';
import { AuthService } from './core/auth.service';
import { Router } from '@angular/router';
import { MediaMatcher } from '@angular/cdk/layout';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
    navigation = [
        { link: 'payment', label: 'Payment', color: '', icon: 'payment' },
        { link: 'github', label: 'GitHub Issues', color: '', icon: 'code' },
        { link: 'team', label: 'Team Service', color: '', icon: 'share' },
        { link: 'users', label: 'Users', color: '', icon: 'people' },
        { link: 'calendar', label: 'Calendar', color: '', icon: 'calendar_today' }
    ];
    theme = 'light-theme';

    @HostBinding('class') componentCssClass;

    mobileQuery: MediaQueryList;
    private mobileQueryListener: () => void;

    constructor(
        public auth: AuthService,
        private router: Router,
        public overlayContainer: OverlayContainer,
        changeDetectorRef: ChangeDetectorRef,
        media: MediaMatcher) {
        this.mobileQuery = media.matchMedia('(max-width: 800px)');
        this.mobileQueryListener = () => changeDetectorRef.detectChanges();

    }

    ngOnInit() {
        this.setTheme(this.theme);
        this.mobileQuery.addListener(this.mobileQueryListener);
    }

    ngOnDestroy(): void {
        this.mobileQuery.removeListener(this.mobileQueryListener);
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
