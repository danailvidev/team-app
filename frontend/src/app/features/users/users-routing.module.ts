import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './users.component';
import { EditComponent } from './edit/edit.component';

const routes: Routes = [
    { path: '', component: UsersComponent },
    { path: 'edit/:id', component: EditComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UsersRoutingModule {
    static components = [
        UsersComponent,
        EditComponent
    ];
}
