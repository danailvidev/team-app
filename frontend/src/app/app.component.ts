import { Component, OnInit, HostBinding } from '@angular/core';
import { OverlayContainer } from '@angular/cdk/overlay';
import { AuthService } from './core/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { IosInstallComponent } from './shared/components/ios-pwa-install/ios-install.component';
import { ScreenSizeService } from './core/screen-size.service';

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
        { link: 'calendar', label: 'Calendar', color: '', icon: 'calendar_today' }
    ];
    theme = 'light-theme';

    @HostBinding('class') componentCssClass;
    isSmallScreen: boolean;

    constructor(
        public auth: AuthService,
        private router: Router,
        public overlayContainer: OverlayContainer,
        private toast: MatSnackBar,
        private screenSizeSvc: ScreenSizeService) {}

    ngOnInit() {
        this.setTheme(this.theme);
        this.isBelowSmallScreen();

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

    private isBelowSmallScreen() {
        this.screenSizeSvc.isSmallScreen$.subscribe( res => {
            this.isSmallScreen = res;
        })
    }
}
