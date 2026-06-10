import { TekneConsignmentsComponent } from './tekne-consignments.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '',  component: TekneConsignmentsComponent, data: { title: 'Tekne Consignment' } }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TekneConsignmentsRoutingModule { }
