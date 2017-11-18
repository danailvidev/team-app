import { Component, OnInit } from '@angular/core';
import { AuthService } from './core/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  navigation = [
    { link: 'users', label: 'Users', color: '' },
    { link: 'about', label: 'About', color: '' }
  ];

  constructor(public auth: AuthService, private router: Router) {

  }
  ngOnInit() {
  }

  logout() {
    const isLoggedOut = this.auth.logout();
    if (isLoggedOut) {
      this.router.navigate([`/`]);
    }
  }
}
