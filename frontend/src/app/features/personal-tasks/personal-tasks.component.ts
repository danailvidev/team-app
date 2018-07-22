import { Component, OnInit, OnDestroy } from '@angular/core';
// import { DragulaService } from 'ng2-dragula';
import { TaskService } from './task.service';
import { Subscriber } from 'rxjs/Subscriber';
import { PersonalTaskDetailComponent } from '@app/features/personal-tasks/personal-task-detail/personal-task-detail.component';
import { MatDialog } from '@angular/material';

export enum TaskType {
    backlog = 1,
    current,
    inprogress,
    done
}

export class TaskModel {
    _id: string;
    content: string;
    type: TaskType;
    createdAt: Date;
}

@Component({
    selector: 'ta-personal-tasks',
    templateUrl: 'personal-tasks.component.html',
    styleUrls: ['personal-tasks.component.scss']
})

export class PersonalTasksComponent implements OnInit, OnDestroy {

    public backlog: Array<TaskModel> = [];
    public current: Array<TaskModel> = [];
    public inprogress: Array<TaskModel> = [];
    public done: Array<TaskModel> = [];

    public groups: Array<any> = [
        this.backlog,
        this.current,
        this.inprogress,
        this.done
    ];

    public types = TaskType;
    public task = new TaskModel();
    public tasks: Array<TaskModel> = [];
    private subscriptions = new Subscriber();

    constructor(
        // private dragulaService: DragulaService,
        private taskService: TaskService,
        public dialog: MatDialog
    ) {

        // dragulaService.drop.subscribe((value) => {
        //     console.log(`drop: ${value[0]}`);
        //     this.onDrop(value.slice(1));
        // });

        // dragulaService.setOptions('nested-bag', {
        //     moves: function (el, source, handle) {
        //         return el.className !== 'nonDraggable';
        //     },
        //     accepts: function (el, target, source, sibling) {
        //         return sibling == null || sibling.classList.contains('draggable');
        //     }
        // });
    }

    ngOnInit() {
        this.getUserTasks();
    }

    ngOnDestroy() {
        this.subscriptions.unsubscribe();
        // this.dragulaService.destroy('nested-bag');
    }

    addTask() {
        this.subscriptions.add(
            this.taskService.addTask(this.task).subscribe((res: any) => {
                if (res.result) {
                    this.getUserTasks();
                    this.task = new TaskModel();
                }
            }, err => {
                console.log(`error : ${err}`);
            })
        );
    }

    getUserTasks() {
        this.subscriptions.add(
            this.taskService.getUserTasks().subscribe(res => {
                this.clearTasks();
                res.forEach(task => {
                    switch (task.type) {
                        case TaskType.backlog:
                            this.backlog.push(task);
                            break;
                        case TaskType.current:
                            this.current.push(task);
                            break;
                        case TaskType.inprogress:
                            this.inprogress.push(task);
                            break;
                        case TaskType.done:
                            this.done.push(task);
                            break;
                    }
                });
            })
        );
    }

    private clearTasks() {
        this.backlog = [];
        this.current = [];
        this.inprogress = [];
        this.done = [];
    }

    public getTaskDetails(task: TaskModel) {
        const dialogRef = this.dialog.open(PersonalTaskDetailComponent, {
            data: task,
            height: '400px',
            width: '600px',
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');
        });
    }

    private onDrop(args) {
        let [e, el] = args;
        console.log(args)
    }

    private onDropModel(args) {
        const [el, target, source] = args;
        console.log(source)
        console.log(target)
        console.log(el)

    }

    private onRemoveModel(args) {
        const [el, source] = args;
        // do something else
    }

    public onclick(key): void {
        alert(JSON.stringify(key))
    }
}



