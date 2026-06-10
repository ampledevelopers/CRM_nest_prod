import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DcFormRoutingModule } from './dc-form-routing.module';
import { DcFormComponent } from './dc-form.component';

import { SpinnerModule } from '@coreui/angular-pro';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    DcFormComponent
  ],
  imports: [
    CommonModule,
    DcFormRoutingModule,
    SpinnerModule,
    FormsModule
  ]
})
export class DcFormModule { }
