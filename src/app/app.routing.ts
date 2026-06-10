import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Import Containers
import { DefaultLayoutComponent } from './containers';


import { LoginComponent } from './views/login/login.component';
import { OtpComponent } from './views/otp/otp.component';
import { ResetPasswordComponent } from './views/reset-password/reset-password.component';


import { AuthGuard } from './auth/auth.guard';
import { CEODashboardComponent } from './views/analytics/ceo-dashboard/ceo-dashboard.component';
import { CreateAppointmentComponent } from './views/appointments/create-appointment/create-appointment.component';
import { AcceptCustomerComponent } from './views/appointments/accept-customer/accept-customer.component';
import { BranchBinAgeingDashboardComponent } from './branch-bin-ageing-dashboard/branch-bin-ageing-dashboard.component';

export const routes: Routes = [
  { path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full' },

  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'Login Page'
    }
  },
  {
    path: 'otp',
    component: OtpComponent,
    data: {
      title: 'Otp Page'
    }
  },
  {
    path: 'reset-password',
    component: ResetPasswordComponent,
    data: {
      title: 'Reset Password'
    }
  },
  {
    path: 'CEO-dashboard',
    component: CEODashboardComponent,
    data: {
      title: 'CEO-dashboard'
    }
  },
  {
    path: 'create-appointment',
    component: CreateAppointmentComponent,
    data: {
      title: 'create-appointment'
    }
  },
  {
    path: 'accept-customer',
    component: AcceptCustomerComponent,
    data: {
      title: 'accept-customer'
    }
  },
  {
    path: 'branch-bin-ageing-dashboard',
    component: BranchBinAgeingDashboardComponent,
    data: {
      title: 'branch-bin-ageing-dashboard'
    }
  },
  {
    path: '',
    component: DefaultLayoutComponent,
    data: {
      title: 'Home'
    }, canActivate: [AuthGuard], runGuardsAndResolvers: 'always',

    children: [
    {
        path: 'add-edit-company',
        loadChildren: () => import('./views/add-edit-company/add-edit-company.module').then(m => m.AddEditCompanyModule)
      },
      {
        path: 'cc-enquiry-update',
        loadChildren: () => import('./views/cc-enquiry-update/cc-enquiry-update.module').then(m => m.CcEnquiryUpdateModule)
      },
      {
        path: 'new-ticket',
        loadChildren: () => import('./views/new-ticket/new-ticket.module').then(m => m.NewTicketModule)
      },
      {
        path: 'icons',
        loadChildren: () => import('./views/icons/icons.module').then(m => m.IconsModule)
      },
      {
        path: 'consignments',
        loadChildren: () => import('./views/consignments/consignments.module').then(m => m.ConsignmentsModule)
      },
      {
        path: 'tekne-consignments',
        loadChildren: () => import('./views/tekne-consignments/tekne-consignments.module').then(m => m.TekneConsignmentsModule)
      },
      {
        path: 'dashboard',
        loadChildren: () => import('./views/dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path: 'dashboard/:type',
        loadChildren: () => import('./views/dashboard/dashboard.module').then(m => m.DashboardModule),
        runGuardsAndResolvers: 'always'
      },
      {
        path: 'search-dashboard',
        loadChildren: () => import('./views/search-dashboard/search-dashboard.module').then(m => m.SearchDashboardModule)
      },
      {
        path: 'tekne-search-dashboard',
        loadChildren: () => import('./views/tekne-search-dashboard/tekne-search-dashboard.module').then(m => m.TekneSearchDashboardModule)
      },
      {
        path: 'onsite-analytics',
        loadChildren: () => import('./views/analytics/analytics.module').then(m => m.AnalyticsModule)
      },
      {
        path: 'analytics',
        loadChildren: () => import('./views/analytics/analytics.module').then(m => m.AnalyticsModule)
      },
      {
        path: 'technician-dashboard',
        loadChildren: () => import('./views/analytics/technician-dashboard/technician-dashboard.module').then(m => m.TechnicianDashboardModule)
      },
      {
        path: 'apps',
        loadChildren: () => import('./views/apps/apps.module').then(m => m.AppsModule)
      },
      {
        path: 'widgets',
        loadChildren: () => import('./views/widgets/widgets.module').then(m => m.WidgetsModule)
      },
       {
        path: 'authentication',
        loadChildren: () => import('./views/authentication/authentication.module').then(m => m.AuthenticationModule)
      },
       {
        path: 'reports',
        loadChildren: () => import('./views/reports/reports.module').then(m => m.ReportsModule)
      },
     {
        path: 'relocate-engg',
        loadChildren: () => import('./views/relocate-engg/relocate-engg.module').then(m => m.RelocateEnggModule)
      },
      {
        path: 'change-ticket-status',
        loadChildren: () => import('./views/change-ticket-status/change-ticket-status.module').then(m => m.ChangeTicketStatusModule)
      },
      {
        path: 'part-add-edit',
        loadChildren: () => import('./views/part-add-edit/part-add-edit.module').then(m => m.PartAddEditModule)
      },
      {
        path: 'update-ageing-time',
        loadChildren: () => import('./views/update-ageing-time/update-ageing-time.module').then(m => m.UpdateAgeingTimeModule)
      },

      {
        path: 'kbb-outward',
        loadChildren: () => import('./views/kbb-outward/kbb-outward.module').then(m => m.KbbOutwardModule)
      },
      {
        path: 'kbb-outward/kbbform',
        loadChildren: () => import('./views/kbb-outward/kbb-form/kbb-form.module').then(m => m.KbbFormModule)
      },
      {
        path: 'replenishment-entry',
        loadChildren: () => import('./views/kgb-inward/kgb-inward.module').then(m => m.KgbInwardModule)
      },
      {
        path: 'free-phy-location',
        loadChildren: () => import('./views/free-phy-location/free-phy-location.module').then(m => m.FreePhyLocationModule)
      },
     {
        path: 'user-create',
        loadChildren: () => import('./views/user-create/user-create.module').then(m => m.UserCreateModule)
      },
      {
        path: 'ticket-details-edit',
        loadChildren: () => import('./views/ticket-details-edit/ticket-details-edit.module').then(m => m.TicketDetailsEditModule)
      },
      {
        path: 'tekne-ticket-details-edit',
        loadChildren: () => import('./views/tekne-ticket-details-edit/tekne-ticket-details-edit.module').then(m => m.TekneTicketDetailsEditModule)
      },
      {
        path: 'acse-form',
        loadChildren: () => import('./views/acse-form/acse-form.module').then(m => m.AcseFormModule)
      },
      {
        path: 'customer-dis-sat',
        loadChildren: () => import('./views/customer-dis-sat/customer-dis-sat.module').then(m => m.CustomerDisSatModule)
      },
    //   {
    //     path: 'missingdevice',
    //     loadChildren: () => import('./views/missingdevice/missingdevice.module').then(m => m.MissingDeviceModule)
    //   },
     {
        path: 'customer-care',
        loadChildren: () => import('./views/customer-care/customer-care.module').then(m => m.CustomerCareModule)
      },
     {
        path: 'dc',
        loadChildren: () => import('./views/onsite-dc/onsite-dc.module').then(m => m.OnsiteDcModule)
      },
      {
        path: 'dc/dc-form',
        loadChildren: () => import('./views/onsite-dc/onsite-dc-form/onsite-dc-form.module').then(m => m.OnsiteDcFormModule)
      },
      {
        path: 'dc/dc-view',
        loadChildren: () => import('./views/onsite-dc/view-dc/view-dc.module').then(m => m.ViewDcModule)
      },
      {
        path: 'message-board',
        loadChildren: () => import('./views/message-board/message-board.module').then(m => m.MessageBoardModule)
      },
      {
        path: 'appointments',
        loadChildren: () => import('./views/appointments/appointments.module').then(m => m.AppointmentsModule)
      },
      {
        path: 'pud-services',
        loadChildren: () => import('./views/pud-services/pud-services.module').then(m => m.PudServicesModule),
      },
      {
        path: 'd-call-services',
        loadChildren: () => import('./views/d-call-services/d-call-services.module').then(m => m.DCallServicesModule),
      },
      {
        path: 'win-dashboard',
        loadChildren: () => import('./views/win-dashboard/win-dashboard.module').then(m => m.WinDashboardModule)
      },
      {
        path: 'win-dashboard/:type',
        loadChildren: () => import('./views/win-dashboard/win-dashboard.module').then(m => m.WinDashboardModule),
        runGuardsAndResolvers: 'always'
      },
      {
        path: 'CEO-dashboard',
        loadChildren: () => import('./views/analytics/ceo-dashboard/ceo-dashboard.module').then(m => m.CEODashboardModule),
        runGuardsAndResolvers: 'always'
      },
      {
        path: 'CEO-dashboard/target-entry',
        loadChildren: () => import('./views/analytics/ceo-dashboard/target-entry/target-entry.module').then(m => m.TargetEntryModule),
        runGuardsAndResolvers: 'always'
      },
      {
      path: 'gsx-reimbursement',
        loadChildren: () => import('./views/gsx-reimbursement/gsx-reimbursement.module').then(m => m.GSXReimbursementModule),
        runGuardsAndResolvers: 'always'
      },
      {
        path: 'dashboard-data-upload',
          loadChildren: () => import('./views/dashboard-data-upload/dashboard-data-upload.module').then(m => m.DashboardDataUploadModule),
          runGuardsAndResolvers: 'always'
      },
      {
        path: 'adhesive-master',
        loadChildren: () => import('./views/adhesive-master/adhesive-master.module').then(m => m.AdhesiveMasterModule),
        runGuardsAndResolvers: 'always'
      },
      {
        path: 's3file-upload',
        loadChildren: () => import('./views/s3file-upload/s3file-upload.module').then(m => m.S3fileUploadModule),
        runGuardsAndResolvers: 'always'
      },
  
      {
        path: 'dl-dc',
        loadChildren: () => import('./views/dl-dc/dl-dc.module').then(m => m.DlDcModule)
      },
      {
        path: 'dl-dc/dc-form',
        loadChildren: () => import('./views/dl-dc/dc-form/dc-form.module').then(m => m.DcFormModule)
      },

      
    ]
  }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload'}) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
