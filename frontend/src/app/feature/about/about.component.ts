import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AboutComponent implements OnInit {
  features: { app: any; angular: any; angularCli: any; typescript: any; };

  constructor() { }

  ngOnInit() {
    this.features = environment.versions;
  }

}
