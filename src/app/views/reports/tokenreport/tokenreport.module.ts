import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TokenreportRoutingModule } from './tokenreport-routing.module';
import { DataTablesModule } from 'angular-datatables';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataFilterPipe } from './datafilterpipe';
import { NgSelectModule } from '@ng-select/ng-select';
import { SpinnerModule } from '@coreui/angular-pro';
import { TokenreportComponent } from './tokenreport.component';
@NgModule({
declarations: [ ],
  imports: [
    CommonModule,
    DataTablesModule,
    FormsModule,
    NgSelectModule,
    TokenreportRoutingModule,
    SpinnerModule,DataFilterPipe,ReactiveFormsModule
  ]
})
export class TokenreportModule { }