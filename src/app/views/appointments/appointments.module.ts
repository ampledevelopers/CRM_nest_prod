import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AppointmentsRoutingModule } from './appointments-routing.module';
import { AppointmentsComponent } from './appointments.component';
import { DataTablesModule } from 'angular-datatables';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { QRCodeModule } from 'angularx-qrcode';
import { SpinnerModule } from '@coreui/angular-pro';
import { ProfileComponent } from '../authentication/profile/profile.component';
@NgModule({
  declarations: [
    AppointmentsComponent,
  ],
  imports: [
    CommonModule,
    AppointmentsRoutingModule,
    DataTablesModule,
    NgbModule,
    FormsModule,
    QRCodeModule,
    SpinnerModule,
    ReactiveFormsModule
  ]
})
export class AppointmentsModule { }
