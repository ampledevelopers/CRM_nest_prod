import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TechnicianPerformanceBiComponent } from './technician-performance-bi.component';
const routes: Routes = [{
  path: '',
  component: TechnicianPerformanceBiComponent,
  data: {
    title: 'Daily Dashboard - BI'
  }
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TechnicianPerformanceBiRoutingModule { }
