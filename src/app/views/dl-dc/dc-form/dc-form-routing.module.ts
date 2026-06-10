import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DcFormComponent } from './dc-form.component';
const routes: Routes = [
  {
    path: '',
    component: DcFormComponent,
    data: {
      title: 'DL DC Form'
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DcFormRoutingModule { }
