import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { merge } from 'rxjs/observable/merge';
import { of as observableOf } from 'rxjs/observable/of';
import { catchError } from 'rxjs/operators/catchError';
import { map } from 'rxjs/operators/map';
import { startWith } from 'rxjs/operators/startWith';
import { switchMap } from 'rxjs/operators/switchMap';
import { GithubService } from '../github.service';

@Component({
    selector: 'app-githubissues',
    templateUrl: './githubissues.component.html',
    styleUrls: ['./githubissues.component.scss']
})
export class GithubissuesComponent implements OnInit {

    displayedColumns = ['created', 'state', 'number', 'labels', 'title'];
    dataSource = new MatTableDataSource();

    resultsLength = 0;
    isLoadingResults = true;
    isRateLimitReached = false;

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    constructor(private svc: GithubService) { }

    ngOnInit() {
        // If the user changes the sort order, reset back to the first page.
        this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
        merge(this.sort.sortChange, this.paginator.page)
            .pipe(
            startWith({}),
            switchMap(() => {
                this.isLoadingResults = true;
                return this.svc.getRepoIssues(
                    this.sort.active, this.sort.direction, this.paginator.pageIndex);
            }),
            map(data => {
                // Flip flag to show that loading has finished.
                this.isLoadingResults = false;
                this.isRateLimitReached = false;
                this.resultsLength = data.total_count;

                return data.items;
            }),
            catchError((err) => {
                this.isLoadingResults = false;
                // Catch if the GitHub API has reached its rate limit. Return empty data.
                this.isRateLimitReached = true;
                return observableOf([]);
            })
            ).subscribe(data => {
                this.dataSource.data = data;
            });
    }

    applyFilter(filterValue: string) {
        filterValue = filterValue.trim(); // Remove whitespace
        filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
        this.dataSource.filter = filterValue;
      }
}
