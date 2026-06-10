import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CEODashboardComponent } from './ceo-dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: CEODashboardComponent,
    data: {
      title: 'CEO Dashboard'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CEODashboardRoutingModule { }
