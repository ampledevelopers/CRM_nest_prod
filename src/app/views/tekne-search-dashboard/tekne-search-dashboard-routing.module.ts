import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TekneSearchDashboardComponent } from './tekne-search-dashboard.component';

const routes: Routes = [
  { path: '',  component: TekneSearchDashboardComponent, data: { title: 'Dashboard' } }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TekneSearchDashboardRoutingModule { }
