import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './users.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
    { path: '', component: UsersComponent },
    { path: 'profile/:id', component: ProfileComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UsersRoutingModule {
    static components = [
        UsersComponent,
        ProfileComponent
    ];
}
