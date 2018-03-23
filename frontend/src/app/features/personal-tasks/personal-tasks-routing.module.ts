import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PersonalTasksComponent } from './personal-tasks.component';

const routes: Routes = [
    { path: '', component: PersonalTasksComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PersonalTasksRoutingModule {
    static components = [
        PersonalTasksComponent
    ];
}
