import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FeedbackreportComponent } from './feedbackreport.component' ;
const routes: Routes = [
  {
    path: '',
    component: FeedbackreportComponent,
    data: {
      title: 'Customer Service Feedback Report'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeedbackreportRoutingModule { }
