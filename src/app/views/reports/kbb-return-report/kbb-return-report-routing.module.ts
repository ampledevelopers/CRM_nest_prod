import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { KbbReturnReportComponent } from './kbb-return-report.component';

const routes: Routes = [
  {
  path: '',
    component: KbbReturnReportComponent,
    data: {
      title: 'KBB Return Report'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class KbbReturnReportRoutingModule { }
