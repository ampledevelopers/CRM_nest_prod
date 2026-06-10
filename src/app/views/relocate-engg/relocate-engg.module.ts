import { NgSelectModule } from '@ng-select/ng-select';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RelocateEnggRoutingModule } from './relocate-engg-routing.module';
import { RelocateEnggComponent } from './relocate-engg.component';
import { SpinnerModule } from '@coreui/angular-pro';
import { FormsModule } from '@angular/forms';
//import { ModalModule, BsModalRef } from 'ngx-bootstrap/modal';


@NgModule({
  declarations: [RelocateEnggComponent],
  imports: [
    SpinnerModule,
    CommonModule,
    FormsModule,
    NgSelectModule,
    RelocateEnggRoutingModule
  ],
  providers: [],
})
export class RelocateEnggModule { }
