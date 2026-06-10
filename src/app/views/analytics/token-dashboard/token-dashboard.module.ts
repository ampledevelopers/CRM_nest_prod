import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TokenDashboardRoutingModule } from './token-dashboard-routing.module';
import { TokenDashboardComponent } from './token-dashboard.component';
import { DataFilterPipe } from './datafilterpipe';
import { FormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';
import { NgSelectModule } from '@ng-select/ng-select';
import { SpinnerModule } from '@coreui/angular-pro';



@NgModule({
  declarations: [TokenDashboardComponent, ],
  imports: [
    CommonModule,
    DataTablesModule,
    FormsModule,
    NgSelectModule,
    TokenDashboardRoutingModule,
    SpinnerModule,
    DataFilterPipe
  ]
})
export class TokenDashboardModule { }
