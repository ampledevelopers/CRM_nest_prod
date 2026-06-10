import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AtlasreportComponent } from './atlasreport.component';
const routes: Routes = [
  {
    path: '',
    component: AtlasreportComponent,
    data: {
      title: 'Atlas Certification Report'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AtlasreportRoutingModule { }
