import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OnsiteDcApproveComponent } from './onsite-dc-approve.component';

const routes: Routes = [
  {
    path: '',
    component: OnsiteDcApproveComponent,
    data: { title: 'DC Approve/View'}
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OnsiteDcApproveRoutingModule { }
