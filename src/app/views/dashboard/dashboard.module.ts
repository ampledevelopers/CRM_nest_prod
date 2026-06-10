import { RouterModule } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { DataTablesModule } from 'angular-datatables';
import { DataFilterPipe } from './datafilterpipe';
import { DiagnosisDataFilterPipe } from './diagnosisDataFilterPipe';
import { FormsModule } from '@angular/forms';

import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { TicketdetailComponent } from './ticketdetail/ticketdetail.component';

import { SpinnerModule } from '@coreui/angular-pro';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {NgxPaginationModule} from 'ngx-pagination';
import { TekneTicketdetailModule } from './tekne-ticketdetail/tekne-ticketdetail.module';
import { ProfileComponent } from '../authentication/profile/profile.component';

@NgModule({
  imports: [
    CommonModule,
    DataTablesModule,
    FormsModule,
    NgSelectModule,
    RouterModule,
    DashboardRoutingModule,
    SpinnerModule,
    NgbModule,
    NgxPaginationModule,
    TekneTicketdetailModule,

  ],
  declarations: [
    DashboardComponent,
    TicketdetailComponent,
    DataFilterPipe,
    DiagnosisDataFilterPipe,
    
    ],
  providers: [NgbModal],
})
export class DashboardModule { }
