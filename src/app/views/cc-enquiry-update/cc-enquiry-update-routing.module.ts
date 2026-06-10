import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CcEnquiryUpdateComponent } from './cc-enquiry-update.component';
import { CcCustomerEnquiryComponent } from './cc-customer-enquiry/cc-customer-enquiry.component';
import { CcTicketDetailComponent } from './cc-ticket-detail/cc-ticket-detail.component';

const routes: Routes = [
  { path: '',  component: CcEnquiryUpdateComponent, data: { title: 'Enquiry Update' } },
  { path: 'customer-enquiry', component: CcCustomerEnquiryComponent, data: { title: 'Customer Enquiry' } },
  { path: 'ticket-detail', component: CcTicketDetailComponent, data: { title: 'Ticket Detail' } },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CcEnquiryUpdateRoutingModule { }
