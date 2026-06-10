import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GsxLookupReportComponent } from './gsx-lookup-report.component' ;
const routes: Routes = [
  {
    path: '',
    component: GsxLookupReportComponent,
    data: {
      title: 'GSX Look-Up Report'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GsxLookupReportRoutingModule { }
