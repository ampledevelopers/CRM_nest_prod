import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReportsComponent } from './reports.component' ;
import { GsxReimbursementReportModule } from './gsx-reimbursement-report/gsx-reimbursement-report.module';
import { RepairsReportTekneComponent } from './repairs-report-tekne/repairs-report-tekne.component';
 const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Reports'
    },
    children: [
      {
        path: 'enquiryreport',
        loadChildren: () => import('./enquiryreport/enquiryreport.module').then(m => m.EnquiryreportModule)
      },
      {
        path: 'reports',
        component : ReportsComponent,
        data: {
          title: 'Reports'
        }
      },
    ]
  },
  {
    path: '',
    data: {
      title: 'Reports'
    },
    children: [
      {
        path: 'repairsreport',
        loadChildren: () => import('./repairsreport/repairsreport.module').then(m => m.RepairsreportModule)
      },
      {
        path: 'reports',
        component : ReportsComponent,
        data: {
          title: 'Reports'
        }
      },
    ]
  },
  {
    path: '',
    data: {
      title: 'Reports'
    },
    children: [
      {
        path: 'onsitereport',
        loadChildren: () => import('./onsitereport/onsitereport.module').then(m => m.OnsitereportModule)
      },
      {
        path: 'reports',
        component : ReportsComponent,
        data: {
          title: 'Reports'
        }
      },
    ]
  },
  {
    path: '',
    data: {
      title: 'Reports'
    },
    children: [
      {
        path: 'tokenreport',
        loadChildren: () => import('./tokenreport/tokenreport.module').then(m => m.TokenreportModule)
      },
      {
        path: 'reports',
        component : ReportsComponent,
        data: {
          title: 'Reports'
        }
      },
    ]
  },
  {
    path: '',
    data: {
      title: 'Reports'
    },
    children: [
      {
        path: 'paymentsreport',
        loadChildren: () => import('./paymentsreport/paymentsreport.module').then(m => m.PaymentsreportModule)
      },
      {
        path: 'reports',
        component : ReportsComponent,
        data: {
          title: 'Reports'
        }
      },
    ]
  },
  {
    path: '',
    data: {
      title: 'Reports'
    },
    children: [
      {
        path: 'statusreport',
        loadChildren: () => import('./statusreport/statusreport.module').then(m => m.StatusreportModule)
      },
      {
        path: 'reports',
        component : ReportsComponent,
        data: {
          title: 'Reports'
        }
      },
    ]
  },
  {
    path: '',
    data: {
      title: 'Reports'
    },
    children: [
      {
        path: 'agentreport',
        loadChildren: () => import('./agentreport/agentreport.module').then(m => m.AgentreportModule)
      },
      {
        path: 'reports',
        component : ReportsComponent,
        data: {
          title: 'Reports'
        }
      },
    ]
  },
  {
    path: '',
    data: {
      title: 'Reports'
    },
    children: [
      {
        path: 'repairs-report-tekne',
        loadChildren: () => import('./repairs-report-tekne/repairs-report-tekne.module').then(m => m.RepairsReportTekneModule)
      },
      {
        path: 'reports',
        component : ReportsComponent,
        data: {
          title: 'Reports'
        }
      },
    ]
  },
  {
    path: '',
    data: {
      title: 'Reports'
    },
    children: [
      {
        path: 'enquiry-report-tekne',
        loadChildren: () => import('./enquiry-report-tekne/enquiry-report-tekne.module').then(m => m.EnquiryReportTekneModule)
      },
      {
        path: 'reports',
        component : ReportsComponent,
        data: {
          title: 'Reports'
        }
      },
    ]
  },
  {
    path: '',
    data: {
      title: 'TAT Report'
    },
    children: [
      {
        path: 'tatreport',
        loadChildren: () => import('./tat-report/tat-report.module').then(m => m.TatReportModule)
      },
      {
        path: 'tatreport',
        component : ReportsComponent,
        data: {
          title: 'TAT ReportsW'
        }
      },
    ]
  },
 {
    path: '',
    data: {
      title: 'Reports'
    },
    children: [
      {
        path: 'quarterlyreport',
        loadChildren:  () => import('./quarterlyreport/quarterlyreport.module').then(m => m.QuarterlyreportModule)
      },
      {
        path: 'reports',
        component : ReportsComponent,
        data: {
          title: 'Reports'
        }
      },
    ]
  },
   {
    path: '',
    data: {
      title: 'Reports'
    },
    children: [
      {
        path: 'gsx-lookup-report',
        loadChildren:  () => import('./gsx-lookup-report/gsx-lookup-report.module').then(m => m.GsxLookupReportModule)
      },
      {
        path: 'reports',
        component : ReportsComponent,
        data: {
          title: 'Reports'
        }
      },
    ]
  },
  {
    path: '',
    data: {
      title: 'Reports'
    },
    children: [
      {
        path: 'feedbackreport',
        loadChildren:  () => import('./feedbackreport/feedbackreport.module').then(m => m.FeedbackreportModule)
      },
      {
        path: 'reports',
        component : ReportsComponent,
        data: {
          title: 'Reports'
        }
      },
    ]
  },
  {
    path: '',
    data: {
      title: 'Reports'
    },
    children: [
      {
        path: 'inventoryreport',
        loadChildren:  () => import('./inventoryreport/inventoryreport.module').then(m => m.InventoryreportModule)
      },
      {
        path: 'reports',
        component : ReportsComponent,
        data: {
          title: 'Reports'
        }
      },
    ]
  },
  {
    path: '',
    data: {
      title: 'Reports'
    },
    children: [
      {
        path: 'svrreport',
        loadChildren:  () => import('./svrreport/svrreport.module').then(m => m.SvrreportModule)
      },
      {
        path: 'reports',
        component : ReportsComponent,
        data: {
          title: 'Reports'
        }
      },
    ]
  },
  {
    path: '',
    data: {
      title: 'Reports'
    },
    children: [
      {
        path: 'atlasreport',
        loadChildren:  () => import('./atlasreport/atlasreport.module').then(m => m.AtlasreportModule)
      },
      {
        path: 'reports',
        component : ReportsComponent,
        data: {
          title: 'Reports'
        }
      },
    ]
  },
 
{
    path: '',
    data: {
      title: 'Reports'
    },
    children: [
      {
        path: 'consignmentstockstatusreport',
        loadChildren:  () => import('./consignmentstockstatusreport/consignmentstockstatusreport.module').then(m => m.ConsignmentstockstatusreportModule)
      },
      {
        path: 'reports',
        component : ReportsComponent,
        data: {
          title: 'Reports'
        }
      },
    ]
  },
  {
    path: '',
    data: {
      title: 'Reports'
    },
    children: [
      {
        path: 'appointmentsreport',
        loadChildren:  () => import('./appointmentsreport/appointmentsreport.module').then(m => m.AppointmentsreportModule)
      },
      {
        path: 'reports',
        component : ReportsComponent,
        data: {
          title: 'Reports'
        }
      },
    ]
  },
    {
    path: '',
    data: {
      title: 'Reports'
    },
    children: [
      {
        path: 'PUDreport',
        loadChildren:  () => import('./PUDreport/PUDreport.module').then(m => m.PUDreportModule)
      },
      {
        path: 'reports',
        component : ReportsComponent,
        data: {
          title: 'Reports'
        }
      },
    ]
  },
    {
    path: '',
    data: {
      title: 'Reports'
    },
    children: [
      {
        path: 'Inventory',
        loadChildren:  () => import('./inventory-reports/inventory-reports.module').then(m => m.InventoryReportsModule)
      },
      {
        path: 'reports',
        component : ReportsComponent,
        data: {
          title: 'Reports'
        }
      },
    ]
  },
  {
    path: '',
    data: {
      title: 'Reports'
    },
    children: [
      {
        path: 'Footfall',
        loadChildren:  () => import('./footfall-customer-reports/footfall-customer-reports.module').then(m => m.FootfallCustomerReportsModule)
      },
      {
        path: 'reports',
        component : ReportsComponent,
        data: {
          title: 'Reports'
        }
      },
    ]
  },
  {
    path: '',
    data: {
      title: 'Reports'
    },
    children: [
      {
        path: 'Compliance',
        loadChildren:  () => import('./compliance-reports/compliance-reports.module').then(m => m.ComplianceReportsModule)
      },
      {
        path: 'reports',
        component : ReportsComponent,
        data: {
          title: 'Reports'
        }
      },
    ]
  },
  {
    path: '',
    data: {
      title: 'Reports'
    },
    children: [
      {
        path: 'Repairs',
        loadChildren:  () => import('./repairs-reports/repairs-reports.module').then(m => m.RepairsReportsModule)
      },
      {
        path: 'reports',
        component : ReportsComponent,
        data: {
          title: 'Reports'
        }
      },
    ]
  },
  {
    path: '',
    data: {
      title: 'Reports'
    },
    children: [
      {
        path: 'gsx-reimbursement-report',
        loadChildren:  () => import('./gsx-reimbursement-report/gsx-reimbursement-report.module').then(m => m.GsxReimbursementReportModule)
      },
      {
        path: 'reports',
        component : ReportsComponent,
        data: {
          title: 'Reports'
        }
      },
    ]
  },
  {
    path: '',
    data: {
      title: 'Reports'
    },
    children: [
      {
        path: 'Kbb-return-report',
        loadChildren:  () => import('./kbb-return-report/kbb-return-report.module').then(m => m.KbbReturnReportModule)
      },
      {
        path: 'reports',
        component : ReportsComponent,
        data: {
          title: 'Reports'
        }
      },
    ]
  },
{
    path: '',
    data: {
      title: 'Reports'
    },
    children: [
      {
        path: 'adhesive-consumption-report',
        loadChildren:  () => import('./adhesive-consumption-report/adhesive-consumption-report.module').then(m => m.AdhesiveConsumptionReportModule)
      },
      {
        path: 'reports',
        component : ReportsComponent,
        data: {
          title: 'Reports'
        }
      },
    ]
  },
  {
    path: '',
    data: {
      title: 'Reports'
    },
    children: [
      {
        path: 'quote-conversion-report',
        loadChildren:  () => import('./quote-conversion-report/quote-conversion-report.module').then(m => m.QuoteConversionReportModule)
      },
      {
        path: 'reports',
        component : ReportsComponent,
        data: {
          title: 'Reports'
        }
      },
    ]
  },
  {
    path: '',
    data: {
      title: 'Reports'
    },
    children: [
      {
        path: 'gsx-flat-report',
        loadChildren:  () => import('./gsx-flat-report/gsx-flat-report.module').then(m => m.GsxFlatReportModule)
      },
      {
        path: 'reports',
        component : ReportsComponent,
        data: {
          title: 'Reports'
        }
      }
    ]
  },
  {
    path: '',
    data: {
      title: 'Reports'
    },
    children: [
      {
        path: 'invoicereport',
        loadChildren: () => import('./invoicereport/invoicereport.module').then(m => m.InvoicereportModule)
      },
      {
        path: 'reports',
        component : ReportsComponent,
        data: {
          title: 'Reports'
        }
      }
    ]
  }
];

/* const routes: Routes = [
  { path: 'enquiryreport',  component: EnquiryreportComponent, data: { title: 'Enquiry' } },
  { path: 'repairsreport', component: RepairsreportComponent, data: { title: 'Repairs'}},
  // { path: 'kbb-approve', component: KbbApproveComponent, data: { title: 'KBB Approve/View'}},
  // { path: 'replenishment-entry', component: KgbInwardComponent, data: { title: 'Replenishment Entry'}}
]; */

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportsRoutingModule { }
