import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../core/api.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html'
})
export class UsersComponent implements OnInit {
  users:any;
  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.users = this.apiService.getUsers();
  }

}
