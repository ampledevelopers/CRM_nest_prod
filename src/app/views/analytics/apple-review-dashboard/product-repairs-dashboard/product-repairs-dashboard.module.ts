import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpinnerModule } from '@coreui/angular-pro';
import { ProductRepairsDashboardRoutingModule } from './product-repairs-dashboard-routing.module';

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    ProductRepairsDashboardRoutingModule,
    SpinnerModule
  ]
})
export class ProductRepairsDashboardModule { }
