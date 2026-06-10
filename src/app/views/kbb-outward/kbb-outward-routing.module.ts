import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { KbbOutwardComponent } from './kbb-outward.component';
import { KbbFormComponent } from './kbb-form/kbb-form.component';
import { KbbApproveComponent } from './kbb-approve/kbb-approve.component';
/* const routes: Routes = [
  {
    path: '',
    component: KbbOutwardComponent,
    data: { title: 'KBB Outward'}
  },
  {
    path: 'kbbform',
    component: KbbFormComponent,
    data: { title: 'KBB Outward Form'}
  },
  {
    path: 'kbb-approve',
    component: KbbApproveComponent,
    data: { title: 'KBB Approve/View'}
  },
]; */

const routes: Routes = [
  { path: '',  component: KbbOutwardComponent, data: { title: 'KBB Outward' } },
  { path: 'kbbform', component: KbbFormComponent, data: { title: 'KBB Outward Form'}},
  { path: 'kbb-approve', component: KbbApproveComponent, data: { title: 'KBB Approve/View'}},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class KbbOutwardRoutingModule { }
