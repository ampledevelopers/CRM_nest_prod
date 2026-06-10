import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { CustomerDisSatRoutingModule } from './customer-dis-sat-routing.module';

import { CustomerDisSatComponent } from './customer-dis-sat.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { SpinnerModule } from '@coreui/angular-pro';
@NgModule({
  declarations: [
    CustomerDisSatComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    NgSelectModule,
    CustomerDisSatRoutingModule,
    SpinnerModule
  ],
  providers: [DatePipe],
  bootstrap: [CustomerDisSatComponent]
})
export class CustomerDisSatModule { }
