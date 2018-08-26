import { Component, OnInit, OnDestroy } from '@angular/core';
import { User } from '../user.model';
import { AuthService } from '@services/auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'ta-app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  public loginUserData = new User();
  public errorMsg = '';
  private subscriptions = new Subscription();

  constructor(
    private authService: AuthService,
    private router: Router) { }

  ngOnInit() {

  }

  login() {
    this.subscriptions.add(
      this.authService.loginUser(this.loginUserData).subscribe(res => {
        if (res) {
          this.router.navigate(['/team']);
        }
      })
    );
  }

  enterAsGuest() {
    const min = 10000;
    const max = 99999;
    const num = Math.floor(Math.random() * (max - min + 1)) + min;
    const randomUser = new User();
    randomUser.email = `Guest${num}@guest${num}.com`;
    randomUser.password = `Password${num}`;
    randomUser.name = `Guest${num}`;
    randomUser.description = `Guest ${num}`;
    this.subscriptions.add(this.authService.registerUser(randomUser).subscribe(res => {
      if (res) {
          this.router.navigate(['/team']);
      }
  }));
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

}
