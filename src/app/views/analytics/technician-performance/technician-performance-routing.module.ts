import { TechnicianPerformanceComponent } from './technician-performance.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: TechnicianPerformanceComponent,
    data: {
      title: 'Technician Performance'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TechnicianPerformanceRoutingModule { }
