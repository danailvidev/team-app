import { Component, OnInit } from '@angular/core';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  navigation = [
    { link: 'about', label: 'About' }
  ];
  private features: any;
  ngOnInit() {
    this.features = environment.versions;
  }
}
