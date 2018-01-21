import { Component, OnDestroy, ViewEncapsulation } from '@angular/core';
import { User } from '../user.model';
import { AuthService } from '../../core/auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnDestroy {
  public user = new User();
  errorMsg = 'error';
  private subscriptions = new Subscription();

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  register() {
    this.subscriptions.add(this.authService.registerUser(this.user).subscribe(res => {
      if (res) {
        this.router.navigate(['/team']);
      }
    }));
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
