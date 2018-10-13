import { NgModule } from '@angular/core';
import { TeamRoutingModule } from './team-routing.module';
import { SharedModule } from '../../shared/shared.module';

// dialogs
import { DialogOverviewExampleDialogComponent } from './user-panel/user-panel.component';
import { UserSettingsComponent } from '../../shared/components/user-settings/user-settings.component';

import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from '@ngrxLocal/effects/auth.effects';
import { StoreModule, ActionReducerMap } from '@ngrx/store';
import { authReducer } from '@ngrxLocal/reducers/auth.reducer';

// Pipes
import { EmailToUserPipe } from '../../shared/pipes/email.pipe';

// Plugins
import {NgxAutoScrollModule} from 'ngx-auto-scroll';

export const reducers: ActionReducerMap<any> = {
  currentUser: authReducer,
};

@NgModule({
  imports: [
    SharedModule,
    TeamRoutingModule,
    NgxAutoScrollModule,

    // ngrx
    StoreModule.forFeature('currentUser', reducers),
    EffectsModule.forFeature([AuthEffects])
  ],
  declarations: [
    TeamRoutingModule.components,

    // dialogs
    DialogOverviewExampleDialogComponent,
    UserSettingsComponent,

    // Pipes
    EmailToUserPipe
  ],
  entryComponents: [
    DialogOverviewExampleDialogComponent,
    UserSettingsComponent
  ]
})
export class TeamModule { }
