import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PaymentsreportComponent } from './paymentsreport.component';
const routes: Routes = [
  {
    path: '',
    component: PaymentsreportComponent,
    data: {
      title: 'Quotation v/s Payment Report'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaymentsreportRoutingModule { }
