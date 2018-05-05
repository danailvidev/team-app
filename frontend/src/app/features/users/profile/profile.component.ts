import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '@services/api.service';
import { Observable, Subscriber } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html'
})
export class ProfileComponent implements OnInit, OnDestroy {
  isNewContact: boolean;
  user: any = {};
  messages$: Observable<any>;
  errorMsg: string = null;
  subscriptions = new Subscriber();

  constructor(private activatedRoute: ActivatedRoute,
    private apiService: ApiService) { }

  ngOnInit() {
    const userId = this.activatedRoute.snapshot.params['id'];
    this.isNewContact = userId === 'new';
    if (!this.isNewContact) {
      this.subscriptions
        .add(this.apiService.getUser(userId).subscribe(res => {
          this.user = res;
        }))
        .add(this.apiService.getMessages(userId).subscribe(res => {
          this.messages$ = res;
        }, (err) => {
          this.errorMsg = err;
        }));
    }
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
