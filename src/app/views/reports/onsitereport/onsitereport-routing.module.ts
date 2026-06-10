import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OnsitereportComponent } from './onsitereport.component';
const routes: Routes = [
  {
    path: '',
    component: OnsitereportComponent,
    data: {
      title: 'Onsite Report'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OnsitereportRoutingModule { }
