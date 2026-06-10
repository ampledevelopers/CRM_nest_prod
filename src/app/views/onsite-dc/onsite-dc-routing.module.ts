import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OnsiteDcComponent } from './onsite-dc.component';
import { OnsiteDcFormComponent } from './onsite-dc-form/onsite-dc-form.component';
import { OnsiteDcApproveComponent } from './onsite-dc-approve/onsite-dc-approve.component';
import { ViewDcComponent } from './view-dc/view-dc.component';
const routes: Routes = [
  {
    path: '',
    component: OnsiteDcComponent,
    data: { title: 'DC Generate'}
  },
  {
    path: 'dc-form',
    component: OnsiteDcFormComponent,
    data: { title: 'KBB Outward Form'}
  },
  {
    path: 'onsitedc-approve',
    component: OnsiteDcApproveComponent,
    data: { title: 'KBB Approve/View'}
  },
  {
    path: 'dc-view',
    component: ViewDcComponent,
    data: { title: 'view DC'}
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OnsiteDcRoutingModule { }
