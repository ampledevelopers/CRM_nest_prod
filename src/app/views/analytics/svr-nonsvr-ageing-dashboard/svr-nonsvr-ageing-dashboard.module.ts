import { NgbModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SvrNonsvrAgeingDashboardRoutingModule } from './svr-nonsvr-ageing-dashboard-routing.module';
import { SvrNonsvrAgeingDashboardComponent } from './svr-nonsvr-ageing-dashboard.component';
import { SpinnerModule } from '@coreui/angular-pro';
import { FormsModule } from '@angular/forms';
import { ModalModule, BsModalRef } from 'ngx-bootstrap/modal';

@NgModule({
  declarations: [SvrNonsvrAgeingDashboardComponent],
  imports: [
    CommonModule,
    FormsModule,
   NgbModule,
    SvrNonsvrAgeingDashboardRoutingModule,
    SpinnerModule
  ],
  providers: [NgbModal]
})
export class SvrNonsvrAgeingDashboardModule { }
