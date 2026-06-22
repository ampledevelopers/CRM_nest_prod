import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AnalyticsComponent } from './analytics.component';
import { BADHomePageModule } from './bad-home-page/bad-home-page.module';

const routes: Routes = [
  {
    path: '',
    component: AnalyticsComponent,
    data: {
      title: 'Onsite Analytics'
    }
  },
  {
    path: '',
    data: {
      title: 'Analytics'
    },
    children: [
      {
        path: 'dayreport',
        loadChildren: () => import('./dayreport/dayreport.module').then(m => m.DayreportModule)
      },
      {
        path: 'analytics',
        component : AnalyticsComponent,
        data: {
          title: 'Analytics'
        }
      },
    ]
  }, {
    path: '',
    data: {
      title: 'Analytics'
    },
    children: [
      {
        path: 'technician-dashboard',
        loadChildren: () => import('./technician-dashboard/technician-dashboard.module').then(m => m.TechnicianDashboardModule)
      },
      {
        path: 'analytics',
        component : AnalyticsComponent,
        data: {
          title: 'Analytics'
        }
      },
    ]
  }, {
    path: '',
    data: {
      title: 'Analytics'
    },
    children: [
      {
        path: 'token-dashboard',
        loadChildren: () => import('./token-dashboard/token-dashboard.module').then(m => m.TokenDashboardModule)
      },
      {
        path: 'analytics',
        component : AnalyticsComponent,
        data: {
          title: 'Analytics'
        }
      },
    ]
  }, {
    path: '',
    data: {
      title: 'Analytics'
    },
    children: [
      {
        path: 'status-dashboard',
        loadChildren: () => import('./status-dashboard/status-dashboard.module').then(m => m.StatusDashboardModule)
      },
      {
        path: 'analytics',
        component : AnalyticsComponent,
        data: {
          title: 'Analytics'
        }
      },
    ]
  },
  {
    path: '',
    data: {
      title: 'Analytics'
    },
    children: [
      {
        path: 'eligible-tickets-dashboard',
        loadChildren: () => import('./eligible-tickets-dashboard/eligible-tickets-dashboard.module').then(m => m.EligibleTicketsDashboardModule)
      },
      {
        path: 'analytics',
        component : AnalyticsComponent,
        data: {
          title: 'Analytics'
        }
      },
    ]
  },
  /* {
    path: '',
    data: {
      title: 'Analytics'
    },
    children: [
      {
        path: 'svr-dashboard',
        loadChildren: () => import('./svr-dashboard/svr-dashboard.module').then(m => m.SvrDashboardModule)
      },
      {
        path: 'analytics',
        component : AnalyticsComponent,
        data: {
          title: 'Analytics'
        }
      },
    ]
  }, */
  {
    path: '',
    data: {
      title: 'Analytics'
    },
    children: [
      {
        path: 'svr-dashboard-bi',
        loadChildren: () => import('./svr-dashboard-bi/svr-dashboard-bi.module').then(m => m.SvrDashboardBiModule)
      },
      {
        path: 'analytics',
        component : AnalyticsComponent,
        data: {
          title: 'Analytics'
        }
      },
    ]
  },
  {
    path: '',
    data: {
      title: 'Analytics'
    },
    children: [
      {
        path: 'inventory-dashboard',
        loadChildren: () => import('./inventory-dashboard/inventory-dashboard.module').then(m => m.InventoryDashboardModule)
      },
      {
        path: 'analytics',
        component : AnalyticsComponent,
        data: {
          title: 'Analytics'
        }
      },
    ]
  },
  {
    path: '',
    data: {
      title: 'Analytics'
    },
    children: [
      {
        path: 'bin-ageing-dashboard',
        loadChildren: () => import('./bin-ageing-dashboard/bin-ageing-dashboard.module').then(m => m.BinAgeingDashboardModule)
      },
      {
        path: 'analytics',
        component : AnalyticsComponent,
        data: {
          title: 'Analytics'
        }
      },
    ]
  },
  {
    path: '',
    data: {
      title: 'Analytics'
    },
    children: [
      {
        path: 'bin-ageing-dashboard-home',
        loadChildren: () => import('./bad-home-page/bad-home-page.module').then(m => m.BADHomePageModule)
      },
      {
        path: 'analytics',
        component : AnalyticsComponent,
        data: {
          title: 'Analytics'
        }
      },
    ]
  },
  {
    path: '',
    data: {
      title: 'Analytics'
    },
    children: [
      {
        path: 'svr-nonsvr-ageing-dashboard',
        loadChildren: () => import('./svr-nonsvr-ageing-dashboard/svr-nonsvr-ageing-dashboard.module').then(m => m.SvrNonsvrAgeingDashboardModule)
      },
      {
        path: 'analytics',
        component : AnalyticsComponent,
        data: {
          title: 'Analytics'
        }
      },
    ]
  },
  /* {
    path: '',
    data: {
      title: 'Analytics'
    },
    children: [
      {
        path: 'kbb-ageing-dashboard',
        loadChildren: () => import('./kbb-ageing-dashboard/kbb-ageing-dashboard.module').then(m => m.KbbAgeingDashboardModule)
      },
      {
        path: 'analytics',
        component : AnalyticsComponent,
        data: {
          title: 'Analytics'
        }
      },
    ]
  }, */
  {
    path: '',
    data: {
      title: 'Analytics'
    },
    children: [
      {
        path: 'kbb-ageing-dashboard-bi',
        loadChildren: () => import('./kbb-ageing-dashboard-bi/kbb-ageing-dashboard-bi.module').then(m => m.KbbAgeingDashboardBiModule)
      },
      {
        path: 'analytics',
        component : AnalyticsComponent,
        data: {
          title: 'Analytics'
        }
      },
    ]
  },
  {
    path: '',
    data: {
      title: 'Analytics'
    },
    children: [
      {
        path: 'acse-dashboard',
        // loadChildren: () => import('./acse-dashboard/acse-dashboard.module').then(m => m.AcseDashboardModule)
        loadChildren: () => import('./acse-dashboard/acse-dashboard.module').then(m => m.AcseDashboardModule)
      },
      {
        path: 'analytics',
        component : AnalyticsComponent,
        data: {
          title: 'Analytics'
        }
      },
    ]
  },
  {
    path: '',
    data: {
      title: 'Analytics'
    },
    children: [
      {
        path: 'inventory-dashboard-bi',
        loadChildren: () => import('./inventory-dashboard-bi/inventory-dashboard-bi.module').then(m => m.InventoryDashboardBiModule)
      },
      {
        path: 'analytics',
        component : AnalyticsComponent,
        data: {
          title: 'Analytics'
        }
      },
    ]
  },
  {
    path: '',
    data: {
      title: 'Analytics'
    },
    children: [
      {
        path: 'daily-dashboard-bi',
        loadChildren: () => import('./daily-dashboard-bi/daily-dashboard-bi.module').then(m => m.DailyDashboardBiModule)
      },
      {
        path: 'analytics',
        component : AnalyticsComponent,
        data: {
          title: 'Analytics'
        }
      },
    ]
  },
  {
    path: '',
    data: {
      title: 'Analytics'
    },
    children: [
      {
        path: 'accy-sales-run-rate-bi',
        loadChildren: () => import('./accy-sales-run-rate-bi/accy-sales-run-rate-bi.module').then(m => m.AccySalesRunRateBiModule)
      },
      {
        path: 'analytics',
        component : AnalyticsComponent,
        data: {
          title: 'Analytics'
        }
      },
    ]
  },
  {
    path: '',
    data: {
      title: 'Analytics'
    },
    children: [
      {
        path: 'technician-performance-bi',
        loadChildren: () => import('./technician-performance-bi/technician-performance-bi.module').then(m => m.TechnicianPerformanceBiModule)
      },
      {
        path: 'analytics',
        component : AnalyticsComponent,
        data: {
          title: 'Analytics'
        }
      },
    ]
  },
  {
    path: '',
    data: {
      title: 'Analytics'
    },
    children: [
      {
        path: 'apple-review-dashboard',
        loadChildren: () => import('./apple-review-dashboard/apple-review-dashboard.module').then(m => m.AppleReviewDashboardModule)
      },
      {
        path: 'analytics',
        component : AnalyticsComponent,
        data: {
          title: 'Analytics'
        }
      },
    ]
  },
  {
    path: '',
    data: {
      title: 'Analytics'
    },
    children: [
      {
        path: 'technician-performance',
        loadChildren: () => import('./technician-performance/technician-performance.module').then(m => m.TechnicianPerformanceModule)
      },
      {
        path: 'analytics',
        component : AnalyticsComponent,
        data: {
          title: 'Analytics'
        }
      },
    ]
  },
  {
    path: '',
    data: {
      title: 'Analytics'
    },
    children: [
      {
        path: 'technician-performance-negetive',
        loadChildren: () => import('./technician-performance-negetive/technician-performance-negetive.module').then(m => m.TechnicianPerformanceNegetiveModule)
      },
      {
        path: 'analytics',
        component : AnalyticsComponent,
        data: {
          title: 'Analytics'
        }
      },
    ]
  },
  {
    path: '',
    data: {
      title: 'Analytics'
    },
    children: [
      {
        path: 'repair-approval-dashboard',
        loadChildren: () => import('./repair-approval-dashboard/repair-approval-dashboard.module').then(m => m.RepairApprovalDashboardModule)
      },
      {
        path: 'analytics',
        component : AnalyticsComponent,
        data: {
          title: 'Analytics'
        }
      },
    ]
  },
  {
    path: '',
    data: {
      title: 'Analytics'
    },
    children: [
      {
        path: 'sdr-dashboard',
        loadChildren: () => import('./sdr-dashboard/sdr-dashboard.module').then(m => m.SdrDashboardModule)
      },
      {
        path: 'analytics',
        component : AnalyticsComponent,
        data: {
          title: 'Analytics'
        }
      },
    ]
  },
  {
    path: '',
    data: {
      title: 'Analytics'
    },
    children: [
      {
        path: 'day-report',
        loadChildren: () => import('./day-report/day-report.module').then(m => m.DayReportModule)
      },
      {
        path: 'analytics',
        component : AnalyticsComponent,
        data: {
          title: 'Analytics'
        }
      },
    ]
  },
  {
    path: '',
    data: {
      title: 'Analytics'
    },
    children: [
      {
        path: 'consignment-report',
        loadChildren: () => import('./consignment-report/consignment-report.module').then(m => m.ConsignmentReportModule)
      },
      {
        path: 'hourly-token-report',
        loadChildren: () => import('./hourly-token-report/hourly-token-report.module').then(m => m.HourlyTokenReportModule)
      },
      {
        path: 'analytics',
        component: AnalyticsComponent,
        data: {
          title: 'Analytics'
        }
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AnalyticsRoutingModule { }
