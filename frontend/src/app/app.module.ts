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
import { userReducer } from './reducers/user.reducer';
import { UserEffects } from './effects/user.effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { authReducer } from './reducers/auth.reducer';

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
    StoreDevtoolsModule.instrument()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
