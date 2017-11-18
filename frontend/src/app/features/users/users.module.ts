import { NgModule } from '@angular/core';
import { UsersRoutingModule } from './users-routing.module';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
    UsersRoutingModule
  ],
  declarations: [UsersRoutingModule.components]
})
export class UsersModule { }
