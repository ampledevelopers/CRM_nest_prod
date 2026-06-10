import { NgSelectModule } from '@ng-select/ng-select';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MissingDeviceRoutingModule } from './missingdevice-routing.module';
import { MissingDeviceComponent } from './missingdevice.component';

import { DataTablesModule } from 'angular-datatables';
import { FormsModule } from '@angular/forms';

import { DataFilterPipe } from './datafilterpipe';
import { SpinnerModule } from '@coreui/angular-pro';


@NgModule({
  declarations: [MissingDeviceComponent,  DataFilterPipe],
  imports: [
    CommonModule,
    FormsModule,
    DataTablesModule,
    NgSelectModule,
    MissingDeviceRoutingModule,
    SpinnerModule
  ]
})
export class MissingDeviceModule { }
