import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { UserComponent } from '../user.component';
import { ApiService } from '../../core/api.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class RegisterComponent implements OnInit {
  public user = new UserComponent('', '');
  constructor(private apiService: ApiService) { }

  ngOnInit() {
  }
  register() {
    this.apiService.registerUser(this.user);
  }
}
