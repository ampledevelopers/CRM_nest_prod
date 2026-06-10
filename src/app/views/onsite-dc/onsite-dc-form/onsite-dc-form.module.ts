import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OnsiteDcFormRoutingModule } from './onsite-dc-form-routing.module';
import { SpinnerModule } from '@coreui/angular-pro';
import { FormsModule } from '@angular/forms';
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    OnsiteDcFormRoutingModule,
    RouterModule,
    SpinnerModule
  ]
})
export class OnsiteDcFormModule { }
