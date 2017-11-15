import { NgModule } from '@angular/core';
import { AboutRoutingModule } from './about-routing.module';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
    AboutRoutingModule
  ],
  declarations: [AboutRoutingModule.components]
})
export class AboutModule { }
