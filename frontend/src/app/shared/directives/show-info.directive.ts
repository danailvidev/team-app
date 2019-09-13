import { Directive, OnInit, OnDestroy, EventEmitter, ElementRef, Renderer2, NgZone } from '@angular/core';

@Directive({
    selector: "[e-showInfo]",
    inputs: ['duration', 'infoData'],
    outputs: ['showInfoEvents: showInfo'],
    exportAs: 'showInforRef'
})
export class ShowInfoDirective implements OnInit, OnDestroy {

    public duration: number;
    public data: string;
    public showInfoEvents: EventEmitter<string>;

    private unlisteners: Function[] | null;
    private timer: any; // TypeScript gets confused if we try to type this.

    constructor(
        private elementRef: ElementRef,
        private renderer: Renderer2,
        private zone: NgZone
    ) {
        this.elementRef = elementRef;
        this.renderer = renderer;
        this.zone = zone;
        this.duration = 1000;
        this.data = '';
        this.showInfoEvents = new EventEmitter();
        this.timer = 0;
        this.unlisteners = null;
    }

    public cancel(): void {
        clearTimeout(this.timer);
    }

    public ngOnDestroy(): void {

        this.cancel();

        if (this.unlisteners) {
            for (let unlistener of this.unlisteners) {
                unlistener();
            }
        }
    }

    public ngOnInit(): void {
        this.zone.runOutsideAngular(
            () => {
                this.unlisteners = [
                    this.renderer.listen(this.elementRef.nativeElement, 'mouseenter', this.handleEnter),
                    this.renderer.listen(this.elementRef.nativeElement, 'focusin', this.handleEnter),
                    this.renderer.listen(this.elementRef.nativeElement, 'mouseleave', this.handleLeave),
                    this.renderer.listen(this.elementRef.nativeElement, 'focusout', this.handleLeave)
                ];
            }
        );
    }

    private handleEnter = (event: FocusEvent | MouseEvent): void => {
        this.timer = setTimeout(this.handleTimerThreshold, this.duration, this.data);
    }

    private handleLeave = (event: MouseEvent | FocusEvent): void => {
        this.cancel();
    }

    private handleTimerThreshold = (data: any): void => {
        this.zone.runGuarded(
            () => {
                this.showInfoEvents.emit(data);
            }
        );
    }
}
