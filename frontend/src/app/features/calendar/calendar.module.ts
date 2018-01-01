import { NgModule } from '@angular/core';
import { CalendarRoutingModule } from './calendar-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { CalendarModule as ngCalendar } from 'angular-calendar';

@NgModule({
  imports: [
    SharedModule,
    CalendarRoutingModule,
    ngCalendar.forRoot(),

  ],
  declarations: [CalendarRoutingModule.components]
})
export class CalendarModule { }
