import { Component, OnInit } from '@angular/core';
import { CalendarEvent } from 'angular-calendar';
import { isSameDay, isSameMonth } from 'date-fns';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {
  viewDate: Date = new Date();

  events: CalendarEvent[] = [
    {
      start: new Date(),
      title: 'An event',
      color: {primary: '#ff0000', secondary: '#ff0000'}
    }
  ];

  activeDayIsOpen: boolean;

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
        this.viewDate = date;
      }
    }
  }


  ngOnInit() {
  }

}
