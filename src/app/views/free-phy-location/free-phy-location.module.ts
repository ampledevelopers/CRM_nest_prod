import { NgSelectModule } from '@ng-select/ng-select';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FreePhyLocationRoutingModule } from './free-phy-location-routing.module';
import { FreePhyLocationComponent } from './free-phy-location.component';

import { DataTablesModule } from 'angular-datatables';
import { FormsModule } from '@angular/forms';

import { DataFilterPipe } from './datafilterpipe';
import { SpinnerModule } from '@coreui/angular-pro';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  declarations: [FreePhyLocationComponent, ], providers: [],
  imports: [
    CommonModule,
    FormsModule,
    DataTablesModule,
    NgSelectModule,
    FreePhyLocationRoutingModule,
    SpinnerModule,
    NgxPaginationModule,
    DataFilterPipe

  ]
})
export class FreePhyLocationModule { }
