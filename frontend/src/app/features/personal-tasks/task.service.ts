import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { BaseApiService } from '@app/core/abstract.service';
import { TaskModel } from '@app/features/personal-tasks/personal-tasks.component';

@Injectable()
export class TaskService extends BaseApiService {

    private relativeUrl = `task`;

    public constructor(http: HttpClient) {
        super(http);
    }

    addTask(task: TaskModel): Observable<TaskModel> {
        return this.post(this.relativeUrl, task);
    }

    updateTask(task: TaskModel): Observable<TaskModel> {
        return this.put(`${this.relativeUrl}/${task._id}`, task);
    }

    getUserTasks(): Observable<any> {
        return this.get(this.relativeUrl);
    }
}
