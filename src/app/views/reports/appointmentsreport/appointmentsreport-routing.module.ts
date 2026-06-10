import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppointmentsreportComponent } from './appointmentsreport.component';
const routes: Routes = [
{
  path: '',
  component: AppointmentsreportComponent,
  data: {
    title: 'Appointments Report'
  }
}
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppointmentsreportRoutingModule { }
