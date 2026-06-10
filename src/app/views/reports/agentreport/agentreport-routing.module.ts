import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AgentreportComponent } from './agentreport.component';
const routes: Routes = [
  {
    path: '',
    component: AgentreportComponent,
    data: {
      title: 'Agent Report'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AgentreportRoutingModule { }
