import { Component, OnInit } from '@angular/core';
import { MatSnackBarRef } from '@angular/material';

@Component({
    selector: 'app-ios-install',
    template: `
    <div class="content">
        Install this app on your device. 
        <br/>Tap the share icon and then <br/><strong>Add to homescreen</strong>.
        <div class="full-width"><mat-icon>arrow_downward</mat-icon></div>
    </div>
    <button class="btn-close" mat-icon-button (click)="close()" aria-label="Close">
        <mat-icon>close</mat-icon>
    </button>
  `,
    styleUrls: ['ios-install.component.scss']
})
export class IosInstallComponent implements OnInit {

    constructor(private snackBarRef: MatSnackBarRef<IosInstallComponent>) { }

    ngOnInit() {
    }

    close() {
        this.snackBarRef.dismiss();
    }

}
