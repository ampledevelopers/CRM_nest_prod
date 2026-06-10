import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ComplianceReportsComponent } from './compliance-reports.component';

const routes: Routes = [
  {
    path: '',
    component: ComplianceReportsComponent,
    data: {
      title: 'Compliance'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComplianceReportsRoutingModule { }
