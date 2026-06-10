import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddAdhesiveComponent } from './add-adhesive.component';

const routes: Routes = [
  {
    path: '',
    component: AddAdhesiveComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddAdhesiveRoutingModule { }
