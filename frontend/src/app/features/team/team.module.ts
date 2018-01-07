import { NgModule } from '@angular/core';
import { TeamRoutingModule } from './team-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { DialogOverviewExampleDialog } from './user-panel/user-panel.component';

@NgModule({
  imports: [
    SharedModule,
    TeamRoutingModule,
  ],
  declarations: [
    TeamRoutingModule.components,
    DialogOverviewExampleDialog
  ],
  entryComponents: [
    DialogOverviewExampleDialog
  ]
})
export class TeamModule { }
