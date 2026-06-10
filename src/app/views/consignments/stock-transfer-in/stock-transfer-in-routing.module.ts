import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StockTransferInComponent } from './stock-transfer-in.component';

const routes: Routes = [
  {
    path: '', component: StockTransferInComponent, data: {title: 'stock-transfer-in'}
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StockTransferInRoutingModule { }
