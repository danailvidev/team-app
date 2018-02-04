import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GithubRoutingModule } from './github-routing.module';
import { GithubissuesComponent } from './githubissues/githubissues.component';

import { GithubService } from './github.service';


// Material
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material';
import { MatInputModule } from '@angular/material';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
    imports: [
        CommonModule,
        GithubRoutingModule,

        // Material
        MatTableModule,
        MatProgressSpinnerModule,
        MatPaginatorModule,
        MatSortModule,
        MatFormFieldModule,
        MatInputModule,
        MatTooltipModule,
        MatButtonModule
    ],
    declarations: [
        GithubRoutingModule.components
    ],
    providers: [
        GithubService
    ]
})
export class GithubModule { }
