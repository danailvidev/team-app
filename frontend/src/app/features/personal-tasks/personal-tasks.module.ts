import { NgModule } from '@angular/core';
import { PersonalTasksRoutingModule } from './personal-tasks-routing.module';
import { SharedModule } from '../../shared/shared.module';

// material
import { MatGridListModule } from '@angular/material/grid-list';
import { MatInputModule } from '@angular/material/input';

// dragula
// import { DragulaModule } from 'ng2-dragula';
import { KeysPipe } from './key.pipe';

import { TaskService } from './task.service';

import { PersonalTaskDetailComponent } from './personal-task-detail/personal-task-detail.component';

@NgModule({
    imports: [
        SharedModule,
        PersonalTasksRoutingModule,
        // DragulaModule,

        // material
        MatGridListModule,
        MatInputModule
    ],
    declarations: [
        PersonalTasksRoutingModule.components,
        PersonalTaskDetailComponent,
        KeysPipe
    ],
    entryComponents: [
        PersonalTaskDetailComponent
    ],
    providers: [
        TaskService
    ]
})
export class PersonalTasksModule { }
