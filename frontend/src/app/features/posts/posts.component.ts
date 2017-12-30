import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../core/api.service';


@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
})
export class PostsComponent implements OnInit {
  postMsg: string;
  errorMsg?: any = null;
  constructor(private apiService: ApiService) { }

  ngOnInit() {
  }

  post() {
    this.apiService.postMsg({ msg: this.postMsg }).subscribe(res => {
      if (res) {
        this.postMsg = '';
      } else {
        this.errorMsg = res;
      }
    }, (err) => {
      this.errorMsg = err;
    });
  }
}
