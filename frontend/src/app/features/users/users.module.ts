import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { UsersRoutingModule } from './users-routing.module';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
    UsersRoutingModule
  ],
  declarations: [UsersRoutingModule.components],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class UsersModule { }
