import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';
import { GithubApi, Issue } from './interfaces';
import { UserModel } from './user.model';

@Injectable()
export class GithubService {
    baseUrl: string = environment.github.baseUrl;
    baseIssueUrl: string = environment.github.baseIssueUrl;
    repoName: string = environment.github.repoName;
    userIssueUrl: string = environment.github.userIssueUrl;

    public constructor(protected http: HttpClient) {
    }

    getRepoIssues(sort: string, order: string, page: number): Observable<GithubApi> {
        const requestUrl =
            `${this.baseIssueUrl}?q=repo:${this.repoName}&sort=${sort}&order=${order}&page=${page + 1}`;
        return this.http.get<GithubApi>(requestUrl);
    }

    createIssue(issue: Issue) {
        return this.http.post(this.userIssueUrl, issue);
    }

    getUser(name: string): Observable<UserModel> {
        const url = `${this.baseUrl}/users/${name}`;
        return this.http.get<UserModel>(url);
    }
}
