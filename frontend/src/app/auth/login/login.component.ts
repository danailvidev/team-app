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
    (window as any).fbAsyncInit = function () {
      const FB = (window as any).FB;
      FB.init({
        appId: '223564278507188',
        cookie: true,
        xfbml: true,
        version: 'v3.1'
      });
      FB.AppEvents.logPageView();
    };

    (function (d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) { return; }
      js = d.createElement(s); js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
  }

  facebookLogin() {
    const FB = (window as any).FB;
    const scopes = 'email,user_likes,public_profile';
    console.log('submitLogin');
    FB.login((response) => {
      console.log('submitLogin', response);
      if (response.authResponse) {
        FB.api(
          `/${response.authResponse.userID}`,
          function (data) {
            if (data) {
              console.log(data);
            }
          }
        );
        // login success
        // login success code here
        // redirect to home page
      } else {
        console.log('User login failed');
      }
    }, { scope: scopes });

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
