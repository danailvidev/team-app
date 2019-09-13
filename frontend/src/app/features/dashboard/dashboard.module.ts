import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';

import { MatCardModule } from '@angular/material';


@NgModule({
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MatCardModule
  ],
  exports: [],
  declarations: [DashboardRoutingModule.components],
  providers: [],
  entryComponents: [DashboardRoutingModule.entry],
})
export class DashboardModule { }
