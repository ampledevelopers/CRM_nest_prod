import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdhesiveMasterComponent } from './adhesive-master.component';
import { AddAdhesiveModule } from './add-adhesive/add-adhesive.module';

const routes: Routes = [
  {
    path: '',
    component: AdhesiveMasterComponent
  },
  {
    path: '',
    data: {
      title: ''
    },
    children: [
      {
        path: 'addadhesive',
        loadChildren: () => import('./add-adhesive/add-adhesive.module').then(m => m.AddAdhesiveModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdhesiveMasterRoutingModule { }
