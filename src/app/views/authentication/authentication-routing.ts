import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Forms'
    },
    children: [
       {
        path: 'register-form',
        loadChildren: () => import('./register/register.module').then(m => m.RegisterModule)
      },
      {
        path: 'resetpassword',
        loadChildren: () => import('./resetpassword/resetpassword.module').then(m => m.ResetpasswordModule)
      },
      {
        path: 'profile',
        loadChildren: () => import('./profile/profile.module').then(m => m.ProfileModule)
      },

      {
        path: 'certificateregister',
        loadChildren: () => import('./certificate-register/certificate-register.module').then(m => m.CertificateRegisterModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthenticationRoutingModule {}
