import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { KbbApproveComponent } from './kbb-approve.component';

const routes: Routes = [
  {
    path: '',
    component: KbbApproveComponent,
    data: { title: 'KBB Approve/View'}
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class KbbApproveRoutingModule { }
