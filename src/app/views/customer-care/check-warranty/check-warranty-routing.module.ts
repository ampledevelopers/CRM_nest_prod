import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CheckWarrantyComponent } from './check-warranty.component';
const routes: Routes = [
  {
    path: '',
    component: CheckWarrantyComponent,
    data: {
      title: 'Check Warranty Status'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CheckWarrantyRoutingModule { }
