import { NgbModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddEditCompanyRoutingModule } from './add-edit-company-routing.module';
import { AddEditCompanyComponent } from './add-edit-company.component';

import { FormsModule } from '@angular/forms';
// import { ModalModule, BsModalRef } from 'ngx-bootstrap/modal';
import { DataFilter } from './datafilter';
import { DataTablesModule } from 'angular-datatables';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  declarations: [AddEditCompanyComponent],
  imports: [
    CommonModule,
    DataTablesModule,
    AddEditCompanyRoutingModule,
    FormsModule,
    NgSelectModule,
    NgbModule,
    DataFilter
  ],
  providers: [NgbModal],
})
export class AddEditCompanyModule { }
