import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, MatDialog } from '@angular/material';
import { of, merge, EMPTY } from 'rxjs';
import { map, startWith, switchMap, catchError, filter, debounceTime } from 'rxjs/operators';
import { GithubService } from '../github.service';
import { CreateissueComponent } from '../createissue/createissue.component';
import { UserModel } from '../user.model';
import { FormControl } from '@angular/forms';

@Component({
    selector: 'ta-githubissues',
    templateUrl: './githubissues.component.html',
    styleUrls: ['./githubissues.component.scss']
})
export class GithubissuesComponent implements OnInit {

    displayedColumns = ['created', 'state', 'number', 'labels', 'title'];
    dataSource = new MatTableDataSource();
    user: UserModel;
    findControl = new FormControl();
    error = false;
    value: any;

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
        this.getUser();
    }

    getUser() {
        this.findControl.valueChanges
            .pipe(
                // Filter if less than two characters are entered
                filter(value => value.length > 2),
                // Set the delay to one second
                debounceTime(1000),
                // Requesting user data
                switchMap(value =>
                    this.svc.getUser(value).pipe(
                        // Error processing
                        catchError(err => {
                            this.user = null;
                            this.error = true;
                            return EMPTY;
                        })
                    )
                )
            )
            // Get the data
            .subscribe(user => {
                this.user = user;
                this.error = false;
            });
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
