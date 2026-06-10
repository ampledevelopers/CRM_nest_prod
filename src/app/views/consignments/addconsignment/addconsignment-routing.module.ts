import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddconsignmentComponent } from './addconsignment.component';

const routes: Routes = [
  {
    path: '', component: AddconsignmentComponent, data: {title: 'Add Consignment'}
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddconsignmentRoutingModule { }
