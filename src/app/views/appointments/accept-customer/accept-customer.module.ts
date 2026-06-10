import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AcceptCustomerRoutingModule } from './accept-customer-routing.module';
import { AcceptCustomerComponent } from './accept-customer.component';
import { ProfileComponent } from '../../authentication/profile/profile.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AcceptCustomerComponent,ProfileComponent
  ],
  imports: [
    CommonModule,FormsModule,
    AcceptCustomerRoutingModule,
  ]
})
export class AcceptCustomerModule { }
