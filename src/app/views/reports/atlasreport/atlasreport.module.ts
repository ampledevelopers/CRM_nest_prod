import { SpinnerModule } from '@coreui/angular-pro';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AtlasreportRoutingModule } from './atlasreport-routing.module';
import { AtlasreportComponent } from './atlasreport.component';
import { DataTablesModule } from 'angular-datatables';
import { FormsModule } from '@angular/forms';

import { DataFilterPipe } from './datafilterpipe';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    DataTablesModule,
    FormsModule,
    NgSelectModule,
    AtlasreportRoutingModule,
    SpinnerModule,
    DataFilterPipe
  ]
})
export class AtlasreportModule { }
