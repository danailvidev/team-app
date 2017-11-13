import { Component, OnInit } from '@angular/core';
import { UserComponent } from '../user.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public user = new UserComponent('', '');
  public errorMsg = '';

  constructor() { }

  ngOnInit() {
  }
  login() {
    console.log(this.user);
    this.errorMsg = 'Failed to login! try again ...';
  }
}
