import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatePipe } from '@angular/common';
import { SpinnerModule } from '@coreui/angular-pro';
import { GSXReimbursementRoutingModule } from './gsx-reimbursement-routing.module';
import { GSXReimbursementComponent } from '../gsx-reimbursement/gsx-reimbursement.component';

@NgModule({
  declarations: [
    GSXReimbursementComponent
  ],
  imports: [
    CommonModule,
    GSXReimbursementRoutingModule,
    SpinnerModule
  ],
  providers: [DatePipe]
})
export class GSXReimbursementModule { }
