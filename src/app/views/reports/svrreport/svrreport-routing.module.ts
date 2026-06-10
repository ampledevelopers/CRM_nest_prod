import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SvrreportComponent } from './svrreport.component';
const routes: Routes = [{
  path: '',
  component: SvrreportComponent,
  data: {
    title: 'Repairs Report'
  }
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SvrreportRoutingModule { }
