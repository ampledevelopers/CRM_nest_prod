import { NgbModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BinAgeingDashboardRoutingModule } from './bin-ageing-dashboard-routing.module';
import { BinAgeingDashboardComponent } from './bin-ageing-dashboard.component';

import { FormsModule } from '@angular/forms';
import { SpinnerModule } from '@coreui/angular-pro';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    NgbModule,
    BinAgeingDashboardRoutingModule,
    SpinnerModule
  ],
  providers: [NgbModal]
})
export class BinAgeingDashboardModule { }
