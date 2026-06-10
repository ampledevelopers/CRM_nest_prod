import { NgbModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StatusDashboardRoutingModule } from './status-dashboard-routing.module';
import { StatusDashboardComponent } from './status-dashboard.component';

import { FormsModule } from '@angular/forms';
import { SpinnerModule } from '@coreui/angular-pro';


@NgModule({
  declarations: [StatusDashboardComponent],
  imports: [
    CommonModule,
    FormsModule,
    NgbModule,
    StatusDashboardRoutingModule,
    SpinnerModule
  ],
  providers: [NgbModal]
})
export class StatusDashboardModule { }
