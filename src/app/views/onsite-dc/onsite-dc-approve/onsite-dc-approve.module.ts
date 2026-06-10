import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { OnsiteDcApproveRoutingModule } from './onsite-dc-approve-routing.module';

import { DataTablesModule } from 'angular-datatables';
import { FormsModule } from '@angular/forms';
import { SpinnerModule } from '@coreui/angular-pro';
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    OnsiteDcApproveRoutingModule,
    FormsModule,
    DataTablesModule,
    RouterModule,
    SpinnerModule
  ]
})
export class OnsiteDcApproveModule { }
