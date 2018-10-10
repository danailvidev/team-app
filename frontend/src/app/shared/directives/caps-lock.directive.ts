import { Directive, Output, EventEmitter, HostListener } from '@angular/core';

@Directive({ selector: '[capsLock]' })
export class CapsDirective {
    constructor() { }

    // tslint:disable-next-line:no-output-rename
    @Output('capsLock') capsLock: EventEmitter<Object> = new EventEmitter();

    @HostListener('window:keydown', ['$event'])
    onKeyDown(event: KeyboardEvent): void {
        const capsOn = event.getModifierState && event.getModifierState('CapsLock');
        if (capsOn) {
            this.capsLock.emit(true);
        } else {
            this.capsLock.emit(false);
        }
    }
}