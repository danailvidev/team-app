import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { DashboardComponent } from './dashboard/dashboard.component';
import { DashboardOutletDirective } from './dashboard-outlet.directive';
import { DashboardCardComponent } from './dashboard-card/dashboard-card.component';
import { DashboardCardContainer } from './dashboard-card/dashboard-card.container';
import { HelloContainer } from './hello/hello.container';
import { HelloComponent } from './hello/hello.component';
import { Hello2Container } from './hello2/hello.container';
import { Hello2Component } from './hello2/hello.component';

const routes: Routes = [
    { path: '', component: DashboardComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DashboardRoutingModule {
    static components = [
      DashboardComponent,
      DashboardOutletDirective,
      DashboardCardComponent,
      DashboardCardContainer,
      HelloContainer,
      HelloComponent,
      Hello2Component,
      Hello2Container
    ];

    static entry = [
      HelloContainer,
      Hello2Container
    ];
}
