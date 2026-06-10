import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DCallServicesRoutingModule } from './d-call-services-routing.module';
import { DCallServicesComponent } from './d-call-services.component';
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

@NgModule({
  declarations: [
    DCallServicesComponent
  ],
  imports: [
    CommonModule,
    SpinnerModule,
    DCallServicesRoutingModule,
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
    QRCodeModule
  ]
})

export class DCallServicesModule { }

