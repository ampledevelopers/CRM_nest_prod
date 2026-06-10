import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InventoryreportComponent } from './inventoryreport.component';
const routes: Routes = [
  {
    path: '',
    component: InventoryreportComponent,
    data: {
      title: 'Inventory Report'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InventoryreportRoutingModule { }
