
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SearchDashboardRoutingModule } from './search-dashboard-routing.module';
import { SearchDashboardComponent } from './search-dashboard.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
//import { SelectModule } from 'ng-select';
// import { BsModalService } from 'ngx-bootstrap/modal';
import { DataFilterPipe } from './datafilterpipe';
import { DataTablesModule } from "angular-datatables";
import { SpinnerModule, ButtonModule } from '@coreui/angular-pro';
@NgModule({
  declarations: [SearchDashboardComponent, DataFilterPipe],
  imports: [
    CommonModule,
    FormsModule,
    NgSelectModule,
    SearchDashboardRoutingModule,
    DataTablesModule,
    SpinnerModule,
    ButtonModule
  ],
  providers: []
})
export class SearchDashboardModule { }
