import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DsatFindingsDashboardComponent } from './dsat-findings-dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: DsatFindingsDashboardComponent,
    data: {
      title: 'dsat-findings-dashboard'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DsatFindingsDashboardRoutingModule { }
