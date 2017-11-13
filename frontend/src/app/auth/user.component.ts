import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user',
  template: ``,
  styles: [``]
})
export class UserComponent implements OnInit {
  constructor(public email: string, public password: string) { }

  ngOnInit() {
  }

}