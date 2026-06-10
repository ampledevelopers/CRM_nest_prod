import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CustomerCareComponent } from './customer-care.component' ;
const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Customer Care'
    },
    children: [
      {
        path: 'check-warranty',
        loadChildren: () => import('./check-warranty/check-warranty.module').then(m => m.CheckWarrantyModule)
      },
      {
        path: '',
        component : CustomerCareComponent,
        data: {
          title: 'Customer Care'
        }
      },
    ]
  },
  {
    path: '',
    data: {
      title: 'Customer Care'
    },
    children: [
      {
        path: 'create-enquiry',
        loadChildren: () => import('./create-enquiry/create-enquiry.module').then(m => m.CreateEnquiryModule)
      },
      {
        path: 'customer-care',
        component : CustomerCareComponent,
        data: {
          title: 'Customer Care'
        }
      },
    ]
  },
  {
    path: '',
    data: {
      title: 'Customer Care'
    },
    children: [
      {
        path: 'custom-cart',
        loadChildren: () => import('./custom-cart/custom-cart.module').then(m => m.CustomCartModule)
      },
      {
        path: 'customer-care',
        component : CustomerCareComponent,
        data: {
          title: 'Customer Care'
        }
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerCareRoutingModule { }
