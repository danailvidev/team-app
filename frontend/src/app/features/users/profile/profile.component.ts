import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../../core/api.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html'
})
export class ProfileComponent implements OnInit {
  isNewContact: boolean;
  user: any = {};
  messages$: Observable<any>;
  errorMsg: string = null;

  constructor(private activatedRoute: ActivatedRoute,
    private apiService: ApiService) { }

  ngOnInit() {
    const userId = this.activatedRoute.snapshot.params['id'];
    this.isNewContact = userId === 'new';
    if (!this.isNewContact) {
      this.apiService.getUser(userId).subscribe(res => {
        this.user = res;
      });
      this.apiService.getMessages(userId).subscribe(res => {
        this.messages$ = res;
      }, (err) => {
        this.errorMsg = err;
      });
    }
  }
}
