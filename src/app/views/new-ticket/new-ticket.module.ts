import { NgbModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewTicketRoutingModule } from './new-ticket-routing.module';
import { NewTicketComponent } from './new-ticket.component';
import { SpinnerModule } from '@coreui/angular-pro';
import { FormsModule } from '@angular/forms';
import { ModalModule, BsModalRef } from 'ngx-bootstrap/modal';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  declarations: [NewTicketComponent],
  imports: [
    CommonModule,
    NewTicketRoutingModule,
    FormsModule,
    NgSelectModule,
    NgbModule,
    SpinnerModule
  ],
  providers: [NgbModal],
})
export class NewTicketModule { }
