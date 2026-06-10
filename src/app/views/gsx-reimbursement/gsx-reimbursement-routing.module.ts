import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GSXReimbursementComponent } from '../gsx-reimbursement/gsx-reimbursement.component';


const routes: Routes = [
  {
    path: '',
    component: GSXReimbursementComponent,
    data: {
      title: 'GSX Reimbursment'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GSXReimbursementRoutingModule { }
