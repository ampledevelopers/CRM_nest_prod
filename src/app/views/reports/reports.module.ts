
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { ReportsRoutingModule } from './reports-routing.module';
import { ReportsComponent } from './reports.component';
import { FormsModule } from '@angular/forms';
import { FootfallCustomerReportsComponent } from './footfall-customer-reports/footfall-customer-reports.component';
import { InventoryReportsComponent } from './inventory-reports/inventory-reports.component';
import { InventoryreportComponent } from './inventoryreport/inventoryreport.component';
import { ConsignmentstockstatusreportComponent } from './consignmentstockstatusreport/consignmentstockstatusreport.component';
import { EnquiryreportComponent } from './enquiryreport/enquiryreport.component';
import { FeedbackreportComponent } from './feedbackreport/feedbackreport.component';
import { TokenreportComponent } from './tokenreport/tokenreport.component';
import { DataTablesModule } from 'angular-datatables';
import { ComplianceReportsComponent } from './compliance-reports/compliance-reports.component';
import { RepairdeviationfraudreportComponent } from './repairdeviationfraudreport/repairdeviationfraudreport.component';
import { MenulogreportComponent } from './menulogreport/menulogreport.component';
import { AtlasreportComponent } from './atlasreport/atlasreport.component';
import { AgeingticketsreportComponent } from './ageingticketsreport/ageingticketsreport.component';
import { GsxLookupReportComponent } from './gsx-lookup-report/gsx-lookup-report.component';
import { RepairsReportsComponent } from './repairs-reports/repairs-reports.component';
import { RepairsreportComponent } from './repairsreport/repairsreport.component';
import { SvrreportComponent } from './svrreport/svrreport.component';
import { AccessoryenquiryreportComponent } from './accessoryenquiryreport/accessoryenquiryreport.component';
import { StatusreportComponent } from './statusreport/statusreport.component';
import { OnsitereportComponent } from './onsitereport/onsitereport.component';
import { AppointmentsreportComponent } from './appointmentsreport/appointmentsreport.component';
import { AgentreportComponent } from './agentreport/agentreport.component';
import { QuarterlyreportComponent } from './quarterlyreport/quarterlyreport.component';
import {RepairsReportTekneComponent} from './repairs-report-tekne/repairs-report-tekne.component';
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
  UtilitiesModule,
  SpinnerModule
} from '@coreui/angular-pro';
import { SmartTablesModule } from '../smart-tables/smart-tables.module';
import { PUDreportComponent } from './PUDreport/pudreport.component';
import { KbbReturnReportComponent } from './kbb-return-report/kbb-return-report.component';
import { AdhesiveConsumptionReportComponent } from './adhesive-consumption-report/adhesive-consumption-report.component';
import { EnquiryReportTekneComponent } from './enquiry-report-tekne/enquiry-report-tekne.component';
@NgModule({
    declarations: [ReportsComponent,InventoryreportComponent,ConsignmentstockstatusreportComponent, InventoryReportsComponent, FootfallCustomerReportsComponent,OnsitereportComponent,PUDreportComponent,QuarterlyreportComponent,
      EnquiryreportComponent,FeedbackreportComponent, ComplianceReportsComponent, RepairdeviationfraudreportComponent, MenulogreportComponent,AgentreportComponent,AppointmentsreportComponent, RepairsReportTekneComponent,
      AtlasreportComponent, AgeingticketsreportComponent, GsxLookupReportComponent, RepairsReportsComponent, RepairsreportComponent, SvrreportComponent, AccessoryenquiryreportComponent, StatusreportComponent, KbbReturnReportComponent, AdhesiveConsumptionReportComponent, EnquiryReportTekneComponent,TokenreportComponent ],
    imports: [
        CommonModule,
        FormsModule,
        ReportsRoutingModule,
        NgSelectModule,
        DataTablesModule,
        SpinnerModule,
        SmartTableModule,
        SmartTablesModule,
        AlertModule,
        BadgeModule,
        ButtonModule,
        CardModule,
        CollapseModule,
        GridModule,
        SharedModule,
        TableModule,
        UtilitiesModule,
    ]
})
export class ReportsModule { }
