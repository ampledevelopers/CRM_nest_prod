import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AcseFormComponent } from './acse-form.component';

const routes: Routes = [{
  path: '',
  component: AcseFormComponent,
  data: {
    title: 'ACSE Form'
  }
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AcseFormRoutingModule { }
