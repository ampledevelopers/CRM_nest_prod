import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RelocateEnggComponent } from './relocate-engg.component';
const routes: Routes = [
  { path: '',  component: RelocateEnggComponent, data: { title: 'Re-Locate Engineer'}}
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RelocateEnggRoutingModule { }
