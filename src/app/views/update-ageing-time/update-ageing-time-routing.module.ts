import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UpdateAgeingTimeComponent } from './update-ageing-time.component';


const routes: Routes = [{
  path: '',
  component: UpdateAgeingTimeComponent,
  data: {
    title: 'Update Ageing Time'
  }
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UpdateAgeingTimeRoutingModule { }
