import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataTablesModule } from 'angular-datatables';
import { AddconsignmentRoutingModule } from './addconsignment-routing.module';
import { AddconsignmentComponent } from './addconsignment.component';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SpinnerModule } from '@coreui/angular-pro';
@NgModule({
  declarations: [AddconsignmentComponent],
  imports: [
    CommonModule,
    AddconsignmentRoutingModule,
    FormsModule,
    NgSelectModule,
    NgbModule,
    SpinnerModule,
    DataTablesModule
  ],
  providers: [NgbModal],
})
export class AddconsignmentModule { }
