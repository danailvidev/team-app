import { NgModule } from '@angular/core';
import { PersonalTasksRoutingModule } from './personal-tasks-routing.module';
import { SharedModule } from '../../shared/shared.module';

import {MatGridListModule} from '@angular/material/grid-list';

@NgModule({
  imports: [
    SharedModule,
    PersonalTasksRoutingModule,

    MatGridListModule
  ],
  declarations: [PersonalTasksRoutingModule.components],
})
export class PersonalTasksModule { }
