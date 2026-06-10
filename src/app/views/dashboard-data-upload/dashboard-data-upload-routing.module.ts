import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardDataUploadComponent } from './dashboard-data-upload.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardDataUploadComponent,
    data: {
      title: 'dashboard-data-upload'
    }
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardDataUploadRoutingModule { }
