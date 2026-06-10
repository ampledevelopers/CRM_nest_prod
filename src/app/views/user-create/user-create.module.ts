import { NgSelectModule } from '@ng-select/ng-select';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserCreateRoutingModule } from './user-create-routing.module';
import { UserCreateComponent } from './user-create.component';

import { FormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';
import { DataFilter } from './datafilter';
import { SmartTablesModule } from '../smart-tables/smart-tables.module';
import {
  AlertModule,
  BadgeModule,
  ButtonModule,
  CardModule,
  CollapseModule,
  GridModule,
  SharedModule,
  SmartTableModule,
  TableModule,
  UtilitiesModule,
  SpinnerModule
} from '@coreui/angular-pro';

@NgModule({
  declarations: [ UserCreateComponent],
  imports: [
    SpinnerModule,
    CommonModule,
    FormsModule,
    DataTablesModule,
    NgSelectModule,
    UserCreateRoutingModule,
    SmartTablesModule,
    AlertModule,
  BadgeModule,
  ButtonModule,
  CardModule,
  CollapseModule,
  GridModule,
  SharedModule,
  SmartTableModule,
  TableModule,
  UtilitiesModule,
  DataFilter,
  
  
  ],
  providers: [],
})
export class UserCreateModule { }
