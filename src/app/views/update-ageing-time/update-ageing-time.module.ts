import { NgSelectModule } from '@ng-select/ng-select';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UpdateAgeingTimeRoutingModule } from './update-ageing-time-routing.module';
import { UpdateAgeingTimeComponent } from './update-ageing-time.component';

import { DataTablesModule } from 'angular-datatables';
import { FormsModule } from '@angular/forms';

import { DataFilterPipe } from './datafilterpipe';
import { SpinnerModule } from '@coreui/angular-pro';

@NgModule({
  declarations: [UpdateAgeingTimeComponent,  ], providers: [],
  imports: [
    CommonModule,FormsModule,
    DataTablesModule,
    NgSelectModule,
    UpdateAgeingTimeRoutingModule,
    SpinnerModule,
    DataFilterPipe
  ]
})
export class UpdateAgeingTimeModule { }
