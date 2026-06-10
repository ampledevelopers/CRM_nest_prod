import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MenulogreportComponent } from './menulogreport.component';
const routes: Routes = [
  {
    path: '',
    component: MenulogreportComponent,
    data: {
      title: 'Menu Log Report'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MenulogreportRoutingModule { }
