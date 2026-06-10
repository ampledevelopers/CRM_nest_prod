import { SpinnerModule } from '@coreui/angular-pro';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MenulogreportRoutingModule } from './menulogreport-routing.module';
import { MenulogreportComponent } from './menulogreport.component';
import { DataTablesModule } from 'angular-datatables';
import { FormsModule } from '@angular/forms';

import { DataFilterPipe } from './datafilterpipe';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  declarations: [DataFilterPipe],
  imports: [
    CommonModule,
    DataTablesModule,
    FormsModule,
    NgSelectModule,
    MenulogreportRoutingModule,
    SpinnerModule
  ]
})
export class MenulogreportModule { }
