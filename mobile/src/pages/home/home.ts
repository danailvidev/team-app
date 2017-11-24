import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  users: string[];
  errorMessage: string;
  constructor(public navCtrl: NavController, public rest: RestProvider) {

  }

  ionViewDidLoad() {
    this.getUsers();
  }

  getUsers() {
    this.rest.getUsers()
      .subscribe(users => {
        this.users = users,
        error => this.errorMessage = <any>error
        console.log(users)
      });
  }

}
