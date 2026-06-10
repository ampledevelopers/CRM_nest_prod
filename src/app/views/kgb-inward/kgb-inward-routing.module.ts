import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { KgbInwardComponent } from './kgb-inward.component';
const routes: Routes = [
  {
    path: '',
    component: KgbInwardComponent,
    data: {
      title: 'Replenishment Entry'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class KgbInwardRoutingModule { }
