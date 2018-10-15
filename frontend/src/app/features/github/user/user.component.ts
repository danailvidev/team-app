import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { UserModel } from '../user.model';

@Component({
  selector: 'ta-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserComponent {
  @Input()
  user: UserModel;
}
