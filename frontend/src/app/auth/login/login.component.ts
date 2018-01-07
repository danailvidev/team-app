import { Component, OnInit } from '@angular/core';
import { User } from '../user.model';
import { AuthService } from '../../core/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public loginUserData = new User();
  public errorMsg = '';

  constructor(
    private authService: AuthService) { }

  ngOnInit() {

  }
  login() {
    this.authService.loginUser(this.loginUserData);
    
  }

}