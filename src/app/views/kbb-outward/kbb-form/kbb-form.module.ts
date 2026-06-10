import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { KbbFormRoutingModule } from './kbb-form-routing.module';
import { SpinnerModule } from '@coreui/angular-pro';
import { FormsModule } from '@angular/forms';
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    KbbFormRoutingModule,
    SpinnerModule
  ]
})
export class KbbFormModule { }
