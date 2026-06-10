import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewDcComponent } from './view-dc.component';

const routes: Routes = [
  {
    path: '',
    component: ViewDcComponent,
    data: {
      title: 'view DC'
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViewDcRoutingModule { }
