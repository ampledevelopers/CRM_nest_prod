import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CustomerDisSatComponent } from './customer-dis-sat.component';

const routes: Routes = [
  { path: '',  component: CustomerDisSatComponent, data: { title: 'Customer Dis-Sat' } },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerDisSatRoutingModule {}
