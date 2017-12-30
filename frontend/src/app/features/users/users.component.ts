import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../core/api.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html'
})
export class UsersComponent implements OnInit {
  users$: any;
  pageError?: string =null;
  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.getUsers();
  }

  private getUsers(): any {
    this.apiService.getUsers().subscribe(res => {
      this.users$ = res;
    }, (err) => {
      this.pageError = err;
    });
  }

}
