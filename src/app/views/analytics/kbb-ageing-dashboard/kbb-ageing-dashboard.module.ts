import { SpinnerModule } from '@coreui/angular-pro';
import { NgbModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { KbbAgeingDashboardRoutingModule } from './kbb-ageing-dashboard-routing.module';
import { KbbAgeingDashboardComponent } from './kbb-ageing-dashboard.component';
import { FormsModule } from '@angular/forms';
import { ModalModule, BsModalRef } from 'ngx-bootstrap/modal';

@NgModule({
  declarations: [KbbAgeingDashboardComponent],
  imports: [
    CommonModule,
    FormsModule,
    NgbModule,
    KbbAgeingDashboardRoutingModule,
    SpinnerModule
  ],
  providers: [NgbModal]
})
export class KbbAgeingDashboardModule { }
