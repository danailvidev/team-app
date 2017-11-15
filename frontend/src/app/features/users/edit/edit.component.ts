import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../../core/api.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  isNewContact: boolean;
  userKey: string;
  user: any = {};

  constructor(private activatedRoute: ActivatedRoute,
    private apiService: ApiService) { }

  ngOnInit() {
    this.userKey = this.activatedRoute.snapshot.params['id'];
    this.isNewContact = this.userKey === 'new';
    if (!this.isNewContact) {
      this.apiService.getUser(this.userKey).subscribe(res => {
        this.user = res;
      });
    }
  }
}
