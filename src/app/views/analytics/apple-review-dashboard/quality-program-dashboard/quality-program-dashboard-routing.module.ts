import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QualityProgramDashboardComponent } from './quality-program-dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: QualityProgramDashboardComponent,
    data: {
      title: 'quality-program-dashboard'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QualityProgramDashboardRoutingModule { }
