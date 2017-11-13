import { Component, OnInit } from '@angular/core';
import { ApiService } from './core/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  navigation = [
    { link: 'about', label: 'About' , color: ''},
    { link: 'login', label: 'Login', color: '' },
    { link: 'register', label: 'Register', color: 'primary' }
  ];
  messages$: any;

  constructor(private apiService: ApiService) {

  }
  ngOnInit() {
    this.messages$ = this.apiService.getMessages();
  }
}
