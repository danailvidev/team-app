import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GithubRoutingModule } from './github-routing.module';
import { GithubissuesComponent } from './githubissues/githubissues.component';

import { GithubService } from './github.service';
import { CreateissueComponent } from './createissue/createissue.component';
import { FormsModule } from '@angular/forms';


// Material
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material';
import { MatInputModule } from '@angular/material';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import {MatIconModule} from '@angular/material/icon';


@NgModule({
    imports: [
        CommonModule,
        GithubRoutingModule,
        FormsModule,

        // Material
        MatTableModule,
        MatProgressSpinnerModule,
        MatPaginatorModule,
        MatSortModule,
        MatFormFieldModule,
        MatInputModule,
        MatTooltipModule,
        MatButtonModule,
        MatDialogModule,
        MatIconModule
    ],
    declarations: [
        GithubRoutingModule.components,
        CreateissueComponent
    ],
    providers: [
        GithubService
    ],
    entryComponents: [
        CreateissueComponent
    ]
})
export class GithubModule { }
