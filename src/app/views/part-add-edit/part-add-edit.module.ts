import { NgSelectModule } from '@ng-select/ng-select';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PartAddEditRoutingModule } from './part-add-edit-routing.module';
import { PartAddEditComponent } from './part-add-edit.component';

import { DataTablesModule } from 'angular-datatables';
import { FormsModule } from '@angular/forms';
import { SpinnerModule } from '@coreui/angular-pro';
import { DataFilter } from './datafilter';

@NgModule({
  declarations: [PartAddEditComponent, ],
  imports: [
    CommonModule,
    DataTablesModule,
    PartAddEditRoutingModule,
    FormsModule,
    NgSelectModule,
    SpinnerModule,
    DataFilter
  ],
  providers: []
})
export class PartAddEditModule { }
