import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DCallServicesComponent } from './d-call-services.component';

const routes: Routes = [
  { path: '',  component: DCallServicesComponent, data: { title: 'd-call services' } }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DCallServicesRoutingModule { }
