import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CcEnquiryUpdateRoutingModule } from './cc-enquiry-update-routing.module';
import { CcEnquiryUpdateComponent } from './cc-enquiry-update.component';

import { CcCustomerEnquiryComponent } from './cc-customer-enquiry/cc-customer-enquiry.component';
import { CcTicketDetailComponent } from './cc-ticket-detail/cc-ticket-detail.component';

import { FormsModule } from '@angular/forms';
import { TabsModule } from 'ngx-bootstrap/tabs';
//import { ModalModule, BsModalRef } from 'ngx-bootstrap/modal';
import { NgbModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { SpinnerModule } from '@coreui/angular-pro';
@NgModule({
  declarations: [CcEnquiryUpdateComponent, CcCustomerEnquiryComponent, CcTicketDetailComponent],
  imports: [
    CommonModule,
    FormsModule,
    NgSelectModule,
    //TabsModule,
    CcEnquiryUpdateRoutingModule,
    NgbModule,
    SpinnerModule
  ],
  providers: [NgbModal],
})
export class CcEnquiryUpdateModule { }
