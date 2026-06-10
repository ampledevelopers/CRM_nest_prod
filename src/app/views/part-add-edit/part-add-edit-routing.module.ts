import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PartAddEditComponent } from './part-add-edit.component';
const routes: Routes = [
  { path: '',  component: PartAddEditComponent, data: { title: 'Add/Edit Part' } },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PartAddEditRoutingModule { }
