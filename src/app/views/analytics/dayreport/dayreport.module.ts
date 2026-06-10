import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { ChartsModule } from 'ng2-charts/ng2-charts';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { DayreportRoutingModule } from './dayreport-routing.module';
import { DayreportComponent } from './dayreport.component';
import { SpinnerModule } from '@coreui/angular-pro';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [DayreportComponent],
  imports: [
    CommonModule,
    DayreportRoutingModule,
    FormsModule,
    SpinnerModule,
    NgxChartsModule
    // ChartsModule
  ]
})
export class DayreportModule { }
