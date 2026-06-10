import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SearchDashboardComponent } from './search-dashboard.component';

const routes: Routes = [
  { path: '',  component: SearchDashboardComponent, data: { title: 'Dashboard' } }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SearchDashboardRoutingModule { }
