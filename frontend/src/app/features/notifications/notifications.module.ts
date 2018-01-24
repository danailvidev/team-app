import { NgModule } from '@angular/core';
import { NotificationsRoutingModule } from './notifications-routing.module';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
    NotificationsRoutingModule,
  ],
  declarations: [NotificationsRoutingModule.components],
})
export class NotificationsModule { }
