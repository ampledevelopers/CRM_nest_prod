import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConsignmentsComponent } from './consignments.component';

const routes: Routes = [
  {
    path: '', component: ConsignmentsComponent,
    data: { title:`Consignments` }
  },
  {
    path: '',
    data: {
      title: ''
    },
    children: [
      {
        path: 'addconsignment',
        loadChildren: () => import('./addconsignment/addconsignment.module').then(m => m.AddconsignmentModule)
      }
    ]
  }, 
  {
    path: '',
    data: {
      title: ''
    },
    children: [
      {
        path: 'stock-transfer-out',
        loadChildren: () => import('./stock-transfer-out/stock-transfer-out.module').then(m => m.StockTransferOutModule)
      },
    ]
  },
  {
    path: '',
    data: {
      title: ''
    },
    children: [
      {
        path: 'stock-transfer-in',
        loadChildren: () => import('./stock-transfer-in/stock-transfer-in.module').then(m => m.StockTransferInModule)
      },
    ]
  }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConsignmentsRoutingModule { }
