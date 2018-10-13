import { NgModule } from '@angular/core';
import { PaymentRoutingModule } from './payment-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { PaymentService } from './payment.service';

@NgModule({
  imports: [
    SharedModule,
    PaymentRoutingModule
  ],
  declarations: [PaymentRoutingModule.components],
  providers: [PaymentService]
})
export class PaymentModule { }
