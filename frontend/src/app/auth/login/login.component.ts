import { Component, OnInit } from '@angular/core';
import { UserComponent } from '../user.component';
import { AuthService } from '../../core/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public loginUserData = new UserComponent('', '');
  public errorMsg = '';

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }
  login() {
    // console.log(this.user);
    // this.errorMsg = 'Failed to login! try again ...';
    this.authService.loginUser(this.loginUserData);
  }
}
