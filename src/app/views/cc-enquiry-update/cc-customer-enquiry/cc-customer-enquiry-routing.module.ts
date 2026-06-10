import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CcCustomerEnquiryComponent } from './cc-customer-enquiry.component';

const routes: Routes = [
  {
    path: '',
    component: CcCustomerEnquiryComponent,
    data: {
      title: 'Customer Enquiry'
    },
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CcCustomerEnquiryRoutingModule { }
