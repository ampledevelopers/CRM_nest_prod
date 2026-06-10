import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpinnerModule } from '@coreui/angular-pro';
import { AppointmentsreportRoutingModule } from './appointmentsreport-routing.module';
import { AppointmentsreportComponent } from './appointmentsreport.component';
import { FormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';
import { DataPipePipe } from './data-pipe.pipe';
@NgModule({
  declarations: [

    DataPipePipe
  ],
  providers: [DataPipePipe],
  imports: [
    SpinnerModule,
    CommonModule,
    AppointmentsreportRoutingModule,
    FormsModule,
    DataTablesModule
  ]
})
export class AppointmentsreportModule { }
