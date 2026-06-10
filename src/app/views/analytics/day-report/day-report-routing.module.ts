import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DayReportComponent } from './day-report.component';

const routes: Routes = [
  {
    path: '',
    component: DayReportComponent,
    data: {
      title: 'Day Report'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DayReportRoutingModule { }
