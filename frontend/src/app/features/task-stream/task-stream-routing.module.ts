import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskStreamComponent } from './task-stream.component';

const routes: Routes = [
    { path: '', component: TaskStreamComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TaskStreamRoutingModule {
    static components = [
        TaskStreamComponent,
    ];
}
