import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OnsiteDcFormComponent } from './onsite-dc-form.component';
const routes: Routes = [
  {
    path: '',
    component: OnsiteDcFormComponent,
    data: {
      title: 'DC Form'
    }
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class OnsiteDcFormRoutingModule { }
