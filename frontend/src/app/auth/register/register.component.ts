import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { UserComponent } from '../user.component';
import { AuthService } from '../../core/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  public user = new UserComponent('', '');
  constructor(private authService: AuthService) { }

  ngOnInit() {
  }
  register() {
    this.authService.registerUser(this.user);
  }
}
