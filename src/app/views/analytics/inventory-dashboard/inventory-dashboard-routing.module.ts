import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InventoryDashboardComponent} from './inventory-dashboard.component';
const routes: Routes = [
  {
    path: '',
    component: InventoryDashboardComponent,
    data: {
      title: 'Inventory Dashboard'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InventoryDashboardRoutingModule { }
