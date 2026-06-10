import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';
import { NgSelectModule } from '@ng-select/ng-select';
import { SpinnerModule } from '@coreui/angular-pro';
import { NgxPaginationModule } from 'ngx-pagination';
import { InvoicereportRoutingModule } from './invoicereport-routing.module';
import { InvoicereportComponent } from './invoicereport.component';

@NgModule({
  declarations: [InvoicereportComponent],
  imports: [
    CommonModule,
    FormsModule,
    DataTablesModule,
    NgSelectModule,
    SpinnerModule,
    NgxPaginationModule,
    InvoicereportRoutingModule
  ]
})
export class InvoicereportModule { }
