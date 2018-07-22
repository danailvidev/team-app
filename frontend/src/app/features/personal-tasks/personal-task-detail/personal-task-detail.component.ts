import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { TaskService } from '../task.service';

@Component({
    selector: 'ta-personal-task-detail',
    templateUrl: 'persinal-task-detail.component.html',
    styleUrls: ['styles.scss']
})
export class PersonalTaskDetailComponent {
    constructor(
        public dialogRef: MatDialogRef<PersonalTaskDetailComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private taskService: TaskService) { }

    onNoClick(): void {
        this.dialogRef.close();
    }

    updateTask() {
        this.taskService.updateTask(this.data).subscribe((res: any) => {
            if (res._id) {
                this.onNoClick();
            }
        });
    }
}
