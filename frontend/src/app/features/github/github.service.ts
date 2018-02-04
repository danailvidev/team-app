import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { GithubApi } from '../../shared/interfaces/github';

@Injectable()
export class GithubService {
    public constructor(protected http: HttpClient) {
    }

    getRepoIssues(sort: string, order: string, page: number): Observable<GithubApi> {
        const baseUrl = environment.github.baseUrl;
        const repoName = environment.github.repoName;
        const requestUrl =
            `${baseUrl}?q=repo:${repoName}&sort=${sort}&order=${order}&page=${page + 1}`;
        return this.http.get<GithubApi>(requestUrl);
    }
}

