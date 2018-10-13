import { NgModule } from '@angular/core';
import { CalendarRoutingModule } from './calendar-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { CalendarModule as ngCalendar, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';

@NgModule({
  imports: [
    SharedModule,
    CalendarRoutingModule,
    ngCalendar.forRoot({
        provide: DateAdapter,
        useFactory: adapterFactory
      }),

  ],
  declarations: [CalendarRoutingModule.components]
})
export class CalendarModule { }
