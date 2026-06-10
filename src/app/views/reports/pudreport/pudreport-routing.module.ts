import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PUDreportComponent } from './pudreport.component';

const routes: Routes = [
  {
    path: '',
    component: PUDreportComponent,
    data: {
      title: 'PUD Report'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PUDreportRoutingModule { }
