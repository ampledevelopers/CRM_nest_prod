import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConsignmentReportComponent } from './consignment-report.component';

const routes: Routes = [
  {
    path: '',
    component: ConsignmentReportComponent,
    data: {
      title: 'Consignment Report Dashboard'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConsignmentReportRoutingModule { }
