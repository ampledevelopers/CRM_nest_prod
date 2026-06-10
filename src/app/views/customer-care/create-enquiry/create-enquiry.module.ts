import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreateEnquiryRoutingModule } from './create-enquiry-routing.module';
import { CreateEnquiryComponent } from './create-enquiry.component';

import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { SpinnerModule } from '@coreui/angular-pro';
@NgModule({
  declarations: [CreateEnquiryComponent],
  imports: [
    CommonModule,
    NgSelectModule,
    FormsModule,
    CreateEnquiryRoutingModule,
    SpinnerModule
  ]
})
export class CreateEnquiryModule { }
