import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';

// Modules
import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';

// ngrx
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { userReducer } from '@ngrxLocal/reducers/user.reducer';
import { UserEffects } from '@ngrxLocal/effects/user.effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { authReducer } from '@ngrxLocal/reducers/auth.reducer';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

// entryComponents
import { IosInstallComponent } from './shared/components/ios-pwa-install/ios-install.component';

@NgModule({
  declarations: [
    AppComponent,
    AppRoutingModule.components,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    CoreModule,
    SharedModule,

    // ngrx
    StoreModule.forRoot({
      users: userReducer,
    }),
    EffectsModule.forRoot([
      UserEffects,
    ]),
    StoreDevtoolsModule.instrument(),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [IosInstallComponent]
})
export class AppModule { }
