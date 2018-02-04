import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GithubissuesComponent } from './githubissues/githubissues.component';

const routes: Routes = [
    { path: '', component: GithubissuesComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class GithubRoutingModule {
    static components = [
        GithubissuesComponent
    ]
}
