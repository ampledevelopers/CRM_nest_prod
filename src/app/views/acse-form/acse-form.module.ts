import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AcseFormRoutingModule } from './acse-form-routing.module';
import { AcseFormComponent } from './acse-form.component';

import { DataTablesModule } from 'angular-datatables';
import { FormsModule } from '@angular/forms';

import { DataFilterPipe } from './datafilterpipe';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgbModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [AcseFormComponent,  ], providers: [NgbModal],
  imports: [
    CommonModule,
    FormsModule,
    DataTablesModule,
    NgSelectModule,
    AcseFormRoutingModule,
    NgbModule,
    DataFilterPipe
  ]
})
export class AcseFormModule { }
