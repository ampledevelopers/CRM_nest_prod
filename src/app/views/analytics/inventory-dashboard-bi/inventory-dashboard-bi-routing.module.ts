import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InventoryDashboardBiComponent } from './inventory-dashboard-bi.component';
const routes: Routes = [{
  path: '',
  component: InventoryDashboardBiComponent,
  data: {
    title: 'Inventory Dashboard - BI'
  }
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InventoryDashboardBiRoutingModule { }
