import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { KgbInwardRoutingModule } from './kgb-inward-routing.module';
import { KgbInwardComponent } from './kgb-inward.component';
import { DataTablesModule } from 'angular-datatables';
import { FormsModule } from '@angular/forms';
import { SpinnerModule } from '@coreui/angular-pro';
import { DataFilterPipe } from './datafilterpipe';
import { ModalModule, BsModalRef } from 'ngx-bootstrap/modal';
import { DatepickerModule, BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxPaginationModule } from 'ngx-pagination';
@NgModule({
  declarations: [KgbInwardComponent], providers: [NgbModal],
  imports: [
    CommonModule,
    KgbInwardRoutingModule,
    FormsModule,
    DataTablesModule,
    NgSelectModule,
    NgbModule,
    NgxPaginationModule,
    SpinnerModule,
    DataFilterPipe
    //BsDatepickerModule.forRoot(),
    //DatepickerModule.forRoot(),
  ]
})
export class KgbInwardModule { }
