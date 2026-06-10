import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GsxReimbursementReportComponent } from './gsx-reimbursement-report.component';

const routes: Routes = [
  {
    path: '',
    component: GsxReimbursementReportComponent,
    data: {
      title: 'gsx-reimbursement-report'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GsxReimbursementReportRoutingModule { }
