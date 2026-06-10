import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CheckWarrantyRoutingModule } from './check-warranty-routing.module';
import { CheckWarrantyComponent } from './check-warranty.component';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { SpinnerModule } from '@coreui/angular-pro';
@NgModule({
  declarations: [CheckWarrantyComponent],
  imports: [
    CommonModule,
    FormsModule,
    NgSelectModule,
    CheckWarrantyRoutingModule,
    SpinnerModule
  ]
})
export class CheckWarrantyModule { }
