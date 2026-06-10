import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { AcseDashboardComponent} from './acse-dashboard.component';
const routes: Routes = [
  {
    path: '',
    component: AcseDashboardComponent,
    data: {
      title: 'ACSE Score Dashboard'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AcseDashboardRoutingModule { }
