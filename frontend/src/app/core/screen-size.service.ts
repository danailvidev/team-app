import { Injectable } from '@angular/core';
import {
    BreakpointObserver,
    Breakpoints,
    BreakpointState
} from '@angular/cdk/layout';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ScreenSizeService {

    private isSmallScreen = new Subject<boolean>();
    public isSmallScreen$ = this.isSmallScreen.asObservable();

    constructor(public breakpointObserver: BreakpointObserver) {
        this.isBelowSmall();
    }

    private isBelowSmall() {
        this.breakpointObserver
            .observe([Breakpoints.Small, Breakpoints.XSmall])
            .subscribe((state: BreakpointState) => {
                if (state.matches) {
                    this.isSmallScreen.next(true);
                } else {
                    this.isSmallScreen.next(false);
                }
            });
    }
}