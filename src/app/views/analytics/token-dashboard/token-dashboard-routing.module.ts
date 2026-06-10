import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TokenDashboardComponent} from './token-dashboard.component';
const routes: Routes = [
  {
    path: '',
    component: TokenDashboardComponent,
    data: {
      title: 'Token Dashboard'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TokenDashboardRoutingModule { }
