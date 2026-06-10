import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppleReviewDashboardComponent } from './apple-review-dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: AppleReviewDashboardComponent,
    data: {
      title: 'Analytics'
    }
  },
  {
    path: '',
    data: {
      title: 'Analytics'
    },
    children: [
      {
        path: 'footfall-dashboard',
        loadChildren: () => import('./foot-fall-dashboard/foot-fall-dashboard.module').then(m => m.FootFallDashboardModule)
      },
      {
        path: 'apple-review-dashboard',
        component : AppleReviewDashboardComponent,
        data: {
          title: 'apple-review-dashboard'
        }
      },
      {
        path: '',
        data: {
          title: 'Analytics'
        },
        children: [
          {
            path: 'csat-period-dashboard',
            loadChildren:  () => import('./csat-period-report/csat-period-report.module').then(m => m.CsatPeriodReportModule)
          },
          {
            path: 'apple-review-dashboard',
            component : AppleReviewDashboardComponent,
            data: {
              title: 'apple-review-dashboard'
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
            path: 'csat-weekly-trend-dashboard',
            loadChildren:  () => import('./csat-weekly-trend-report/csat-weekly-trend-report.module').then(m => m.CsatWeeklyTrendReportModule)
          },
          {
            path: 'apple-review-dashboard',
            component : AppleReviewDashboardComponent,
            data: {
              title: 'apple-review-dashboard'
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
            path: 'dsat-findings-dashboard',
            loadChildren:  () => import('./dsat-findings-dashboard/dsat-findings-dashboard.module').then(m => m.DsatFindingsDashboardModule)
          },
          {
            path: 'apple-review-dashboard',
            component : AppleReviewDashboardComponent,
            data: {
              title: 'apple-review-dashboard'
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
            path: 'repairs-coverage-dashboard',
            loadChildren:  () => import('./repairs-coverage-dashboard/repairs-coverage-dashboard.module').then(m => m.RepairsCoverageDashboardModule)
          },
          {
            path: 'apple-review-dashboard',
            component : AppleReviewDashboardComponent,
            data: {
              title: 'apple-review-dashboard'
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
            path: 'quality-program-dashboard',
            loadChildren:  () => import('./quality-program-dashboard/quality-program-dashboard.module').then(m => m.QualityProgramDashboardModule)
          },
          {
            path: 'apple-review-dashboard',
            component : AppleReviewDashboardComponent,
            data: {
              title: 'apple-review-dashboard'
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
            path: 'product-repairs-dashboard',
            loadChildren:  () => import('./product-repairs-dashboard/product-repairs-dashboard.module').then(m => m.ProductRepairsDashboardModule)
          },
          {
            path: 'apple-review-dashboard',
            component : AppleReviewDashboardComponent,
            data: {
              title: 'apple-review-dashboard'
            }
          },
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppleReviewDashboardRoutingModule { }
