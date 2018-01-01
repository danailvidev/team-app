import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../core/api.service';
import { AuthService } from '../../core/auth.service';
import { NotifyService } from '../../core/notify.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
})
export class PostsComponent implements OnInit {
  postMsg: string;
  constructor(
    private apiService: ApiService,
    public auth: AuthService,
    public notifyService: NotifyService) { }

  ngOnInit() {
  }

  post() {
    this.apiService.postMsg({ msg: this.postMsg }).subscribe(res => {
      if (res.result) {
        this.postMsg = '';
        const notifyConfig = this.notifyService.notify('message posted', 'undo?', {
          duration: 4000,
          panelClass: ['snack-success']
        });
        // tslint:disable-next-line:no-shadowed-variable
        this.notifyService.notifyAction(notifyConfig, () => this.deletePost(res.id));
      }
    }, (err) => {
      this.notifyService.notify(err, null, {
        duration: 4000,
        panelClass: ['snack-denied']
      });
    });
  }

  deletePost(postId) {
    this.apiService.deleteMsg(postId);
  }
}
