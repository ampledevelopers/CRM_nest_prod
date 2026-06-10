import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PudServicesRoutingModule } from './pud-services-routing.module';
import { PudServicesComponent } from './pud-services.component';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import {
  AlertModule,
  BadgeModule,
  ButtonModule,
  CardModule,
  CollapseModule,
  GridModule,
  SharedModule,
  SmartTableModule,
  TableModule,
  UtilitiesModule
} from '@coreui/angular-pro';
import { SpinnerModule } from '@coreui/angular-pro';
import { GoogleMapsModule } from '@angular/google-maps';
import { QRCodeModule } from 'angularx-qrcode';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';
import { CreatePudTicketComponent } from './create-pud-ticket/create-pud-ticket.component';
import { HttpClient } from '@angular/common/http';
import { DataTablesModule } from 'angular-datatables';
@NgModule({
  declarations: [
    PudServicesComponent,
    CreatePudTicketComponent,
  ],
  imports: [
    CommonModule,
    SpinnerModule,
    PudServicesRoutingModule,
    SmartTableModule,
    GridModule,
    CardModule,
    NgSelectModule,
    CollapseModule,
    TableModule,
    UtilitiesModule,
    BadgeModule,
    SharedModule,
    ButtonModule,
    AlertModule,
    NgbModule,
    FormsModule,
    GoogleMapsModule,
    HttpClientModule,
    HttpClientJsonpModule,
    QRCodeModule,DataTablesModule
  ]
})
export class PudServicesModule { }
