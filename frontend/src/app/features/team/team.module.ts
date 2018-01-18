import { NgModule } from '@angular/core';
import { TeamRoutingModule } from './team-routing.module';
import { SharedModule } from '../../shared/shared.module';

// dialogs
import { DialogOverviewExampleDialog } from './user-panel/user-panel.component';
import { UserSettingsComponent } from '../../shared/components/user-settings/user-settings.component';

import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from '../../effects/auth.effects';
import { StoreModule, ActionReducerMap } from '@ngrx/store';
import { authReducer } from '../../reducers/auth.reducer';

// Pipes
import { EmailToUserPipe } from '../../shared/pipes/email.pipe';


export const reducers: ActionReducerMap<any> = {
  currentUser: authReducer,
};

@NgModule({
  imports: [
    SharedModule,
    TeamRoutingModule,

    // ngrx
    StoreModule.forFeature('currentUser', reducers),
    EffectsModule.forFeature([AuthEffects])
  ],
  declarations: [
    TeamRoutingModule.components,

    // dialogs
    DialogOverviewExampleDialog,
    UserSettingsComponent,

    // Pipes
    EmailToUserPipe
  ],
  entryComponents: [
    DialogOverviewExampleDialog,
    UserSettingsComponent
  ]
})
export class TeamModule { }
