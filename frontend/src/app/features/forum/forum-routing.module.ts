import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForumComponent } from './forum.component';

const routes: Routes = [
    { path: '', component: ForumComponent },
    { path: 'general', component: ForumComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ForumRoutingModule {
    static components = [
        ForumComponent,
    ];
}
