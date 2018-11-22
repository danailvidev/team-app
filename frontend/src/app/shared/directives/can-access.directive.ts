import { Directive, Input, OnInit, OnDestroy, TemplateRef, ViewContainerRef } from "@angular/core";
import { Subscription } from "rxjs";
import { WorkflowEventsService } from "@services/workflow-events.service";

@Directive({
    selector: '[appCanAccess]'
})
export class CanAccessDirective implements OnInit, OnDestroy {
    @Input('appCanAccess') appCanAccess: string | string[];
    private permission$: Subscription;

    constructor(private templateRef: TemplateRef<any>,
        private viewContainer: ViewContainerRef,
        private workflowEvents: WorkflowEventsService) {
    }

    ngOnInit(): void {
        this.applyPermission();
    }

    private applyPermission(): void {
        this.permission$ = this.workflowEvents
            .checkAuthorization(this.appCanAccess)
            .subscribe(authorized => {
                if (authorized) {
                    this.viewContainer.createEmbeddedView(this.templateRef);
                } else {
                    this.viewContainer.clear();
                }
            });
    }

    ngOnDestroy(): void {
        this.permission$.unsubscribe();
    }

}