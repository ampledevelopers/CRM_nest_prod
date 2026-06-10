import { NgbModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomCartRoutingModule } from './custom-cart-routing.module';
import { CustomCartComponent } from './custom-cart.component';
import { FormsModule } from '@angular/forms';

import { DataFilterPipe } from './datafilterpipe';
import { ModalModule, BsModalRef } from 'ngx-bootstrap/modal';
import { DataTablesModule } from 'angular-datatables';
import { NgSelectModule } from '@ng-select/ng-select';
import { SpinnerModule } from '@coreui/angular-pro';
@NgModule({
  declarations: [CustomCartComponent, ],
  imports: [
    CommonModule,
    DataTablesModule,
    FormsModule,
    NgSelectModule,
    CustomCartRoutingModule,
    NgbModule,
    SpinnerModule,
    DataFilterPipe
  ],
  providers: [NgbModal],
})
export class CustomCartModule { }
