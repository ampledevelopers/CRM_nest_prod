import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MissingDeviceComponent } from './missingdevice.component';

const routes: Routes = [{
  path: '',
  component: MissingDeviceComponent,
  data: {
    title: 'Missing Devices'
  }
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MissingDeviceRoutingModule { }
