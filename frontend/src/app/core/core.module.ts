import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

// Service
import { AuthService } from './auth.service';
import { ApiService } from './api.service';
import { AuthInterceptor } from './auth.interceptor';
import { ResponseInterceptor } from './response.interceptor';
import { NotifyService } from './notify.service';
import { LoggingService } from './logging/loggin.service';
import { LogPublisherService } from './logging/log-publishers.service';
import { SocketIOService, SocketService } from './web-sockets';
import { ScreenSizeService } from './screen-size.service';

// Guards
import { AuthGuard } from '../auth/auth.guard';

// system
import { EnsureModuleLoadedOnceGuard } from '../shared/module-import-guard';

// input validations
import { ErrorStateMatcher } from '@angular/material/core';
import { ShowOnDirtyErrorStateMatcher } from '@angular/material';

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
        LoggingService,
        LogPublisherService,
        ScreenSizeService,
        { provide: SocketService, useClass: SocketIOService },
        AuthGuard,
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ResponseInterceptor, multi: true },
        { provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher }
    ]
})
export class CoreModule extends EnsureModuleLoadedOnceGuard {
    constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
        super(parentModule);
    }
}
