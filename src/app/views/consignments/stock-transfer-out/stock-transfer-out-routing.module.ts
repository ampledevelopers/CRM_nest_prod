import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StockTransferOutComponent } from './stock-transfer-out.component';

const routes: Routes = [
  {
    path: '', component: StockTransferOutComponent, data: {title: 'stock-transfer-out'}
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StockTransferOutRoutingModule { }
