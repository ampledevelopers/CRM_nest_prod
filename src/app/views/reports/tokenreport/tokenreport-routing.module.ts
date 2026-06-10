import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TokenreportComponent } from './tokenreport.component';
const routes: Routes = [
  {
    path: '',
    component: TokenreportComponent,
    data: {
      title: 'Token Report'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TokenreportRoutingModule { }
