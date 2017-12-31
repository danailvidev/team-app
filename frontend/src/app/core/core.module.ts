import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

// Service
import { AuthService } from './auth.service';
import { ApiService } from './api.service';
import { AuthInterceptor } from './auth.interceptor';
import { NotifyService } from './notify.service';

// Guards
import { AuthGuard } from '../auth/auth.guard';

// system
import { EnsureModuleLoadedOnceGuard } from '../shared/module-import-guard';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
  ],
  declarations: [],
  providers: [
    ApiService,
    AuthService,
    NotifyService,
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
  ]
})
export class CoreModule extends EnsureModuleLoadedOnceGuard {
  constructor( @Optional() @SkipSelf() parentModule: CoreModule) {
    super(parentModule);
  }
}
