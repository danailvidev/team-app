import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { PostsComponent } from './features/posts/posts.component';

import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
    { path: '', component: PostsComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'about', canActivate: [AuthGuard], loadChildren: 'app/features/about/about.module#AboutModule' },
    { path: 'users', canActivate: [AuthGuard], loadChildren: 'app/features/users/users.module#UsersModule' },
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
        PostsComponent
    ];
}
