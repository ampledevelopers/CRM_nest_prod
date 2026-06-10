import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EnquiryReportTekneComponent } from './enquiry-report-tekne.component';

const routes: Routes = [
  {
    path: '',
    component: EnquiryReportTekneComponent,
    data: {
      title: 'Enquiry Report Tekne'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EnquiryReportTekneRoutingModule { }
