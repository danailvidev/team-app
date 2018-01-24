import { NgModule } from '@angular/core';
import { ForumRoutingModule } from './forum-routing.module';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
    ForumRoutingModule,
  ],
  declarations: [ForumRoutingModule.components],
})
export class ForumModule { }
