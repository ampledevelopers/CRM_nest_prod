import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { KbbFormComponent } from './kbb-form.component';
const routes: Routes = [
  {
    path: '',
    component: KbbFormComponent,
    data: {
      title: 'KBB Outward Form'
    }
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class KbbFormRoutingModule { }
