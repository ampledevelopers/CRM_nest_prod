import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InvoicereportComponent } from './invoicereport.component';

const routes: Routes = [
  {
    path: '',
    component: InvoicereportComponent,
    data: {
      title: 'Invoice Report'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InvoicereportRoutingModule { }
