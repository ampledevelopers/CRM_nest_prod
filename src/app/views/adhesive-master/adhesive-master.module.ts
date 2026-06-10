import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdhesiveMasterRoutingModule } from './adhesive-master-routing.module';
import { AdhesiveMasterComponent } from '../adhesive-master/adhesive-master.component';
import { AddAdhesiveComponent } from './add-adhesive/add-adhesive.component';
import { DataTablesModule } from 'angular-datatables';

@NgModule({
  declarations: [
    AdhesiveMasterComponent,
    // AddAdhesiveComponent
  ],
  imports: [
    CommonModule,
    AdhesiveMasterRoutingModule,
    FormsModule,
    DataTablesModule
  ]
})
export class AdhesiveMasterModule { }
