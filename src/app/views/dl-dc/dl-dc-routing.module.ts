import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DlDcComponent } from './dl-dc.component';
import { DcFormComponent } from './dc-form/dc-form.component';
const routes: Routes = [
  { path: '',  component: DlDcComponent, data: { title: 'DL DC' } },
  { path: 'kbbform', component: DcFormComponent, data: { title: 'DL DC Form'}},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DlDcRoutingModule { }
