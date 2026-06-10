import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FreePhyLocationComponent } from './free-phy-location.component';

const routes: Routes = [
  {
    path: '',
    component: FreePhyLocationComponent,
    data: {
      title: 'Physical Location Free'
    }
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FreePhyLocationRoutingModule { }
