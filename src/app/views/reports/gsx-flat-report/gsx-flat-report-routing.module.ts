import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GsxFlatReportComponent } from './gsx-flat-report.component';

const routes: Routes = [
  {
    path: '',
    component: GsxFlatReportComponent,
    data: {
      title: 'gsx-flat-report'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GsxFlatReportRoutingModule { }
