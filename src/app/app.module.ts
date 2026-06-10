import { TekneTicketDetailsEditComponent } from './views/tekne-ticket-details-edit/tekne-ticket-details-edit.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgModule, isDevMode } from '@angular/core';
import { HashLocationStrategy, LocationStrategy, PathLocationStrategy, CommonModule } from '@angular/common';
import { BrowserModule, Title } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { PerfectScrollbarConfigInterface, PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';

import { GtagModule } from 'angular-gtag'; //google tag
// Import routing module
import { AppRoutingModule } from './app.routing';
import { AuthGuard } from './auth/auth.guard';
import { UserService } from './shared/user.service';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
// Import app component
import { AppComponent } from './app.component';
import { AuthInterceptor } from './auth/auth.interceptor';
import {
  AvatarModule,
  BadgeModule,
  BreadcrumbModule,
  ButtonGroupModule,
  ButtonModule,
  CardModule,
  DropdownModule,
  FooterModule,
  FormModule,
  GridModule,
  HeaderModule,
  ListGroupModule,
  NavModule,
  ProgressModule,
  SharedModule,
  SidebarModule,
  TabsModule,
  UtilitiesModule,
} from '@coreui/angular-pro';
import { ChartjsModule } from '@coreui/angular-chartjs';
import { IconModule, IconSetService } from '@coreui/icons-angular';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { DataTablesModule } from 'angular-datatables';
import { environment } from './../environments/environment';
import { LoginComponent } from './views/login/login.component';
import { OtpComponent } from './views/otp/otp.component';
import { DefaultAsideComponent, DefaultFooterComponent, DefaultHeaderComponent, DefaultLayoutComponent } from './containers';
import { MaterialModule } from './material.module';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { SpinnerModule } from '@coreui/angular-pro';
import { NgbModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
// import { DocsComponentsModule } from '../docs-components/docs-components.module'; // Removed as the module does not exist
import { CEODashboardComponent } from './views/analytics/ceo-dashboard/ceo-dashboard.component';
import { CreateAppointmentComponent } from './views/appointments/create-appointment/create-appointment.component';
import { AcceptCustomerComponent } from './views/appointments/accept-customer/accept-customer.component';
import { ProfileComponent } from './views/authentication/profile/profile.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { TekneTicketdetailComponent } from './views/dashboard/tekne-ticketdetail/tekne-ticketdetail.component';
import { TekneSearchDashboardModule } from './views/tekne-search-dashboard/tekne-search-dashboard.module';
import { TekneConsignmentsComponent } from './views/tekne-consignments/tekne-consignments.component';
import { OverlayScrollbars } from 'overlayscrollbars';
import { RouterModule } from '@angular/router';
import { TekneTicketdetailModule } from './views/dashboard/tekne-ticketdetail/tekne-ticketdetail.module';
import { EnquiryReportTekneModule } from './views/reports/enquiry-report-tekne/enquiry-report-tekne.module';
import { S3 } from '@aws-sdk/client-s3';
import { S3fileUploadComponent } from './views/s3file-upload/s3file-upload.component';
import { AnalyticsComponent } from './views/analytics/analytics.component';
import { UserCreateComponent } from './views/user-create/user-create.component';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true,
};

const APP_CONTAINERS = [
  DefaultAsideComponent,
  DefaultFooterComponent,
  DefaultHeaderComponent,
  DefaultLayoutComponent
];

@NgModule({ declarations: [AppComponent, TekneTicketdetailComponent,TekneConsignmentsComponent,
    ],
    bootstrap: [AppComponent], 
    imports: [BrowserModule,
      DefaultHeaderComponent,
      DefaultFooterComponent,
      DefaultAsideComponent,
      DefaultLayoutComponent,
      RouterModule,
        CommonModule,
        SpinnerModule,
        IconModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        AvatarModule,
        BreadcrumbModule,
        FooterModule,
        DropdownModule,
        GridModule,
        HeaderModule,
        SidebarModule,
        NavModule,
        ButtonModule,
        FormModule,
        UtilitiesModule,
        ButtonGroupModule,
        ReactiveFormsModule,
        SidebarModule,
        SharedModule,
        TabsModule,
        ListGroupModule,
        ProgressModule,
        BadgeModule,
        ListGroupModule,
        CardModule,
        FormsModule,
        MaterialModule,
        NgbModule,
        NgSelectModule,
        ProfileComponent,
        // DocsComponentsModule, // Removed as the module does not exist
        ChartjsModule,
        DataTablesModule,
        MatTableModule,
        MatCardModule,
        MatButtonModule,
        MatProgressBarModule,
        TekneSearchDashboardModule,
        EnquiryReportTekneModule,
        TekneTicketdetailModule,
        ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
        // GtagModule.forRoot({ trackingId: 'G-MBQY631RGR' }),
        ServiceWorkerModule.register('ngsw-worker.js', {
            enabled: !isDevMode(),
            // Register the ServiceWorker as soon as the application is stable
            // or after 30 seconds (whichever comes first).
            registrationStrategy: 'registerWhenStable:30000'
        })], providers: [IconSetService,
        {
            provide: LocationStrategy,
            useClass: HashLocationStrategy,
        },
        {
            provide: PERFECT_SCROLLBAR_CONFIG,
            useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG,
        },
        AuthGuard,
        Title,
        UserService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true
        },
        {
            provide: LocationStrategy,
            useClass: HashLocationStrategy
        }, NgbModal, provideHttpClient(withInterceptorsFromDi())] })
export class AppModule {
}
