import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { Issue } from '../interfaces';
import { GithubService } from '../github.service';
import { NotifyService } from '../../../core/notify.service';

@Component({
    selector: 'app-createissue',
    templateUrl: './createissue.component.html',
    styleUrls: ['./createissue.component.scss']
})
export class CreateissueComponent implements OnInit {
    issue: Issue;
    constructor(
        public dialogRef: MatDialogRef<CreateissueComponent>,
        private ghSvc: GithubService,
        private notifyService: NotifyService
    ) { }

    ngOnInit() {
        this.issue = {};
    }

    save() {
        this.ghSvc.createIssue(this.issue).subscribe((res: any) => {
            if (res.id && res.number) {
                const createdIssue: Issue = res;
                this.notifyService.notify(createdIssue.title + ' Created', null, {
                    duration: 4000,
                    panelClass: ['snack-success']
                });
                this.dismiss(res.id);
            }
        });
    }

    dismiss(id: any = null) {
        this.issue = {};
        this.onNoClick(id);
    }

    onNoClick(id: any = null): void {
        this.dialogRef.close(id);
    }
}
