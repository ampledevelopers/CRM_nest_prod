import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FootfallCustomerReportsComponent } from './footfall-customer-reports.component';

const routes: Routes = [
  {
    path: '',
    component: FootfallCustomerReportsComponent,
    data: {
      title: 'Footfall'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FootfallCustomerReportsRoutingModule { }
