import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { KbbOutwardRoutingModule } from './kbb-outward-routing.module';
import { KbbOutwardComponent } from './kbb-outward.component';
import { KbbFormComponent } from './kbb-form/kbb-form.component';
import { KbbApproveComponent } from './kbb-approve/kbb-approve.component';
import { FormsModule } from '@angular/forms';
// import { ModalModule, BsModalRef } from 'ngx-bootstrap/modal';
import { NgbModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DataTablesModule } from 'angular-datatables';
import { NgxPaginationModule } from 'ngx-pagination';
import { SpinnerModule } from '@coreui/angular-pro';
@NgModule({
  declarations: [KbbOutwardComponent, KbbFormComponent, KbbApproveComponent],
  imports: [
    CommonModule,
    KbbOutwardRoutingModule,
    FormsModule,
    DataTablesModule,
    NgbModule,
    NgxPaginationModule,
    SpinnerModule
  ],
  providers: [NgbModal],
})
export class KbbOutwardModule { }
