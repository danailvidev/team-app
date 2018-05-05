import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatPaginator, MatSort, MatTableDataSource, MatDialog } from '@angular/material';
import { Observable, of, merge } from 'rxjs';
import {  map, startWith, switchMap, catchError } from 'rxjs/operators';
import { GithubService } from '../github.service';
import { CreateissueComponent } from '../createissue/createissue.component';

@Component({
    selector: 'ta-githubissues',
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

    constructor(
        private svc: GithubService,
        public dialog: MatDialog) { }

    ngOnInit() {
        this.getIssues();
    }

    getIssues() {
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
                map((data: any) => {
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
                    return of([]);
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

    addIssue() {
        const dialogRef = this.dialog.open(CreateissueComponent, {
            width: '450px'
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.getIssues();
            }
        });
    }
}
