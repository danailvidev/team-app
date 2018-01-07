import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { PostsComponent } from './features/posts/posts.component';

import { AuthGuard } from './auth/auth.guard';
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';

const routes: Routes = [
    { path: '', component: PostsComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'forgot-password', component: ForgotPasswordComponent },
    { path: 'calendar', canActivate: [AuthGuard], loadChildren: 'app/features/calendar/calendar.module#CalendarModule' },
    { path: 'users', canActivate: [AuthGuard], loadChildren: 'app/features/users/users.module#UsersModule' },
    { path: 'team', canActivate: [AuthGuard], loadChildren: 'app/features/team/team.module#TeamModule' },
    { path: '**', pathMatch: 'full', redirectTo: '/login' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
    static components = [
        LoginComponent,
        RegisterComponent,
        PostsComponent,
        ForgotPasswordComponent
    ];
}