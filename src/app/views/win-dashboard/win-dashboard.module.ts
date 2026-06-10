import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { DataFilterPipe } from './datafilterpipe';
import { FormsModule } from '@angular/forms';
import { WinDashboardComponent } from './win-dashboard.component';
import { WinDashboardRoutingModule } from './win-dashboard-routing.module';

import { WinTicketdetailComponent } from './win-ticketdetail/win-ticketdetail.component';
import { TabsModule } from '@coreui/angular-pro';
import { NgSelectModule } from '@ng-select/ng-select';
import { DataTablesModule } from 'angular-datatables';
import { ReactiveFormsModule } from '@angular/forms';
import { SpinnerModule } from '@coreui/angular-pro';
import {NgxPaginationModule} from 'ngx-pagination';
import { RouterModule } from '@angular/router';
@NgModule({
  imports: [
    RouterModule,
    CommonModule,
    DataTablesModule,
    NgSelectModule,
    FormsModule,
    WinDashboardRoutingModule,
    SpinnerModule,
    NgxPaginationModule,
    /* ModalModule.forRoot(),
    CollapseModule.forRoot(),
    PopoverModule.forRoot(),
    TooltipModule.forRoot(),
    BsDatepickerModule.forRoot(),
    DatepickerModule.forRoot(),
    TimepickerModule.forRoot(), */
    ReactiveFormsModule,
    TabsModule,DataFilterPipe        
  ],
  declarations: [
    WinDashboardComponent,
    WinTicketdetailComponent,
    
    ],
  providers: [NgbModal],
})
export class WinDashboardModule { }
