import { NgbModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataTablesModule } from 'angular-datatables';
import { ConsignmentsRoutingModule } from './consignments-routing.module';
import { ConsignmentsComponent } from './consignments.component';
import { SpinnerModule } from '@coreui/angular-pro';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  declarations: [ConsignmentsComponent],
  imports: [
    CommonModule,
    ConsignmentsRoutingModule,
    NgbModule,
    FormsModule,
    NgSelectModule,
    SpinnerModule,
    DataTablesModule
  ],
  providers: [NgbModal],
})
export class ConsignmentsModule { }
