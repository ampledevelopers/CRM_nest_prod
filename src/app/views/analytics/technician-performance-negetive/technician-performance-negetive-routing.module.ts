import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TechnicianPerformanceNegetiveComponent } from './technician-performance-negetive.component';

const routes: Routes = [
  {
    path: '',
    component: TechnicianPerformanceNegetiveComponent,
    data: {
      title: 'Technician Performance'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TechnicianPerformanceNegetiveRoutingModule { }
