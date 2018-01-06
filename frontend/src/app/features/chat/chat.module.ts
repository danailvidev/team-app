import { NgModule } from '@angular/core';
import { ChatRoutingModule } from './chat-routing.module';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
    ChatRoutingModule,
  ],
  declarations: [ChatRoutingModule.components]
})
export class ChatModule { }
