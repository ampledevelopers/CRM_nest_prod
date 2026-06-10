import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddAdhesiveRoutingModule } from './add-adhesive-routing.module';
import { AddAdhesiveComponent } from './add-adhesive.component';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { DataTablesModule } from 'angular-datatables';
@NgModule({
  declarations: [
    AddAdhesiveComponent
  ],
  imports: [
    CommonModule,
    AddAdhesiveRoutingModule,
    FormsModule,
    NgSelectModule,
    DataTablesModule
  ]
})
export class AddAdhesiveModule { }
