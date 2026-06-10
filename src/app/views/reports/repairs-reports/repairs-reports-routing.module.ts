import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RepairsReportsComponent } from './repairs-reports.component';

const routes: Routes = [
  {
    path: '',
    component: RepairsReportsComponent,
    data: {
      title: 'Footfall'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RepairsReportsRoutingModule { }
