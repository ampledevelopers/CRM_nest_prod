import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerCareRoutingModule } from './customer-care-routing.module';
import { CustomerCareComponent } from './customer-care.component';
import {NgxPaginationModule} from 'ngx-pagination';
// import { ModalModule, BsModalRef } from 'ngx-bootstrap/modal';
import { FormsModule } from '@angular/forms';
import { DataFilterPipe } from './datafilterpipe';
import { NgSelectModule } from '@ng-select/ng-select';
import { DataTablesModule } from 'angular-datatables';
import { NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SpinnerModule } from '@coreui/angular-pro';
@NgModule({
  declarations: [CustomerCareComponent, ],
  imports: [
    CommonModule,
    FormsModule,
    NgSelectModule,
    NgbModule,
    CustomerCareRoutingModule,
    DataTablesModule,
    SpinnerModule,
    NgxPaginationModule,
    DataFilterPipe
  ],
  providers: [NgbModal],
})
export class CustomerCareModule { }
