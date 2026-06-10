import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AcseDashboardRoutingModule } from './acse-dashboard-routing.module';
import { AcseDashboardComponent } from './acse-dashboard.component';

import { FormsModule } from '@angular/forms';
import { NgbModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SpinnerModule } from '@coreui/angular-pro';
@NgModule({
  declarations: [AcseDashboardComponent],
  imports: [
    CommonModule,
    FormsModule,
    NgbModule,
    AcseDashboardRoutingModule,
    SpinnerModule
  ],
  providers: [NgbModal]
})
export class AcseDashboardModule { }
