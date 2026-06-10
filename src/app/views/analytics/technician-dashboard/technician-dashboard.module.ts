import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TechnicianDashboardRoutingModule } from './technician-dashboard-routing.module';
import { TechnicianDashboardComponent } from './technician-dashboard.component';

// import { BsDatepickerModule } from 'ngx-bootstrap';
import { FormsModule } from '@angular/forms';
import { SpinnerModule } from '@coreui/angular-pro';
import { PopoverModule } from 'ngx-bootstrap/popover';
import { TabsModule } from 'ngx-bootstrap/tabs';

@NgModule({
  declarations: [TechnicianDashboardComponent],
  imports: [
    CommonModule,
    TechnicianDashboardRoutingModule,
    // BsDatepickerModule.forRoot(),
    FormsModule,
    SpinnerModule
  ]
})
export class TechnicianDashboardModule { }
