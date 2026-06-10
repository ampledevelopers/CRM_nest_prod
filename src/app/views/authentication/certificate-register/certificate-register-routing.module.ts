import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CertificateRegisterComponent } from './certificate-register.component';

const routes: Routes = [
  {
    path: '',
    component: CertificateRegisterComponent,
    data: {
      title: 'Resetpassword Of User '
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CertificateRegisterRoutingModule {}
