import { RepairsReportTekneComponent } from './repairs-report-tekne.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: RepairsReportTekneComponent,
    data: {
      title: 'Repairs Report Tekne'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RepairsReportTekneRoutingModule { }
