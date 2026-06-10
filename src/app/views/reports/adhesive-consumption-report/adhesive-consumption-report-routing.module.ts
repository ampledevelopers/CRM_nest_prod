import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdhesiveConsumptionReportComponent } from './adhesive-consumption-report.component';

const routes: Routes = [
  {
    path: '',
    component: AdhesiveConsumptionReportComponent,
    data: {
      title: 'Adhesive Consumption Report'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdhesiveConsumptionReportRoutingModule { }
