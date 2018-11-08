import { Component, OnInit, HostBinding, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { OverlayContainer } from '@angular/cdk/overlay';
import { AuthService } from './core/auth.service';
import { Router } from '@angular/router';
// import { MediaMatcher } from '@angular/cdk/layout';
import { MatSnackBar } from '@angular/material';
import { IosInstallComponent } from './shared/components/ios-pwa-install/ios-install.component';

import {
    BreakpointObserver,
    Breakpoints,
    BreakpointState
} from '@angular/cdk/layout';

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
    isSmallScreen: boolean;

    constructor(
        public auth: AuthService,
        private router: Router,
        public overlayContainer: OverlayContainer,
        // changeDetectorRef: ChangeDetectorRef,
        // media: MediaMatcher,
        private toast: MatSnackBar,
        public breakpointObserver: BreakpointObserver) {
        // this.mobileQuery = media.matchMedia('(max-width: 800px)');
        // this.mobileQueryListener = () => changeDetectorRef.detectChanges();

    }

    ngOnInit() {
        this.setTheme(this.theme);
        // this.mobileQuery.addListener(this.mobileQueryListener);

        // Detects if device is on iOS 
        const isIos = () => {
            const userAgent = window.navigator.userAgent.toLowerCase();
            return /iphone|ipad|ipod/.test(userAgent);
        }
        // Detects if device is in standalone mode
        const isInStandaloneMode = () => ('standalone' in (window as any).navigator) && ((window as any).navigator.standalone);

        // Checks if should display install popup notification:
        if (isIos() && !isInStandaloneMode()) {
            this.toast.openFromComponent(IosInstallComponent, {
                duration: 8000,
                horizontalPosition: 'start',
                panelClass: ['mat-elevation-z3']
            });
        }

        this.breakpointObserver
            .observe([Breakpoints.Small, Breakpoints.XSmall])
            .subscribe((state: BreakpointState) => {
                if (state.matches) {
                    this.isSmallScreen = true;
                } else {
                    this.isSmallScreen = false;
                }
            });
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
