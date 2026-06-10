import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CustomCartComponent } from './custom-cart.component';
const routes: Routes = [
  {
    path: '',
    component: CustomCartComponent,
    data: {
      title: 'Custom Cart'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomCartRoutingModule { }
