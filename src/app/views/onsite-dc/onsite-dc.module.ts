import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { OnsiteDcRoutingModule } from './onsite-dc-routing.module';
import { OnsiteDcComponent } from './onsite-dc.component';
import { OnsiteDcApproveComponent } from './onsite-dc-approve/onsite-dc-approve.component';
import { OnsiteDcFormComponent } from './onsite-dc-form/onsite-dc-form.component';
import { FormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';
import { NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { SpinnerModule } from '@coreui/angular-pro';
import { ViewDcComponent } from './view-dc/view-dc.component';
@NgModule({
  declarations: [OnsiteDcComponent, OnsiteDcApproveComponent, OnsiteDcFormComponent, ViewDcComponent],
  imports: [
    CommonModule,
    OnsiteDcRoutingModule,
    FormsModule,
    DataTablesModule,
    NgbModule,
    NgSelectModule,
    RouterModule,
    SpinnerModule
  ],
  providers: [NgbModal]
})
export class OnsiteDcModule { }
