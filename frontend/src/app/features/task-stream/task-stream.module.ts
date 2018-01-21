import { NgModule } from '@angular/core';
import { TaskStreamRoutingModule } from './task-stream-routing.module';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
    TaskStreamRoutingModule
  ],
  declarations: [TaskStreamRoutingModule.components],
})
export class TaskStreamModule { }
