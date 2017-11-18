import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { User } from '../user.model';
import { AuthService } from '../../core/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  public user = new User();
  constructor(private authService: AuthService) { }

  ngOnInit() {
  }
  register() {
    this.authService.registerUser(this.user);
  }
}
