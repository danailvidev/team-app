import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig, MatSnackBarRef, SimpleSnackBar } from '@angular/material';

@Injectable()
export class NotifyService {

    constructor(public snackBar: MatSnackBar) { }

    notify(message: string, action: string, config: MatSnackBarConfig): MatSnackBarRef<SimpleSnackBar> {
        return this.snackBar.open(message, action, {
            duration: config.duration,
            panelClass: config.panelClass,
            verticalPosition: 'top'
        });
    }

    notifyAction(notification: MatSnackBarRef<any>, next) {
        return notification.onAction().subscribe(() => {
            next();
        });
    }

    dismiss() {
        this.snackBar.dismiss();
    }
}
