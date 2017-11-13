import { NgModule } from '@angular/core';
import { FeatureRoutingModule } from './feature-routing.module';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  imports: [
    SharedModule,
    FeatureRoutingModule
  ],
  declarations: [FeatureRoutingModule.components]
})
export class FeatureModule { }
