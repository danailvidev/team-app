import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { User } from '../user.model';
import { AuthService } from '../../core/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  public user = new User();
  errorMsg = 'error';
  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
  }
  register() {
    this.authService.registerUser(this.user).subscribe( res => {
      if (res) {
        this.router.navigate(['/team']);
      }
    });
  }
}
