import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DlDcRoutingModule } from './dl-dc-routing.module';
import { DlDcComponent } from './dl-dc.component';

import { SpinnerModule } from '@coreui/angular-pro';
import { FormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgbModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    DlDcComponent
  ],
  imports: [
    CommonModule,
    DlDcRoutingModule,
    FormsModule,
    DataTablesModule,
    NgxPaginationModule,
    SpinnerModule,
    NgbModule
  ],
  providers: [NgbModal],
})
export class DlDcModule { }
