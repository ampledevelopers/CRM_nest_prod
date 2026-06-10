import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BADHomePageComponent } from './bad-home-page.component';

const routes: Routes = [
  {
    path: '',
    component: BADHomePageComponent,
    data: {
      title: 'Bin Ageing Dashboard Home'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BADHomePageRoutingModule { }
