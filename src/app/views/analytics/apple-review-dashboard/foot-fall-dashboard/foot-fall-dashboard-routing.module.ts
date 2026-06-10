import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FootFallDashboardComponent } from './foot-fall-dashboard.component';

const routes: Routes = [{
  path: '',
    component: FootFallDashboardComponent,
    data: {
      title: 'Foot Fall Dashboard'
    }
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FootFallDashboardRoutingModule { }
