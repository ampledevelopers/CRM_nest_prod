import { NgSelectModule } from '@ng-select/ng-select';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccessoryenquiryreportRoutingModule } from './accessoryenquiryreport-routing.module';
import { DataTablesModule } from 'angular-datatables';
import { FormsModule } from '@angular/forms';
import { SpinnerModule} from '@coreui/angular-pro';
import { DataFilterPipe } from './datafilterpipe';


@NgModule({
  declarations: [ ],
  imports: [DataFilterPipe,
    CommonModule,
    DataTablesModule,
    FormsModule,
    NgSelectModule,
    AccessoryenquiryreportRoutingModule,
    SpinnerModule
  ]
})
export class AccessoryenquiryreportModule { }
