import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TargetEntryComponent } from './target-entry.component';

const routes: Routes = [
  {
    path: '',
    component: TargetEntryComponent,
    data: {
      title: 'Target Entry'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TargetEntryRoutingModule { }
