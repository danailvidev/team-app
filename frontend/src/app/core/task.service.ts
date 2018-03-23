import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/observable/throw';
import { BaseApiService } from './abstract.service';
import { Task } from '../features/personal-tasks/personal-tasks.component';

@Injectable()
export class TaskService extends BaseApiService {

    private relativeUrl = `task`;

    public constructor(http: HttpClient) {
        super(http);
    }

    addTask(task: Task): Observable<Task> {
        return this.post(this.relativeUrl, task);
    }

    updateTask(task: Task): Observable<Task> {
        return this.put(`${this.relativeUrl}/${task._id}`, task);
    }

    getUserTasks(): Observable<any> {
        return this.get(this.relativeUrl);
    }
}
