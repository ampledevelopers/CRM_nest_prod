import { NgSelectModule } from '@ng-select/ng-select';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { CertificateRegisterRoutingModule } from './certificate-register-routing.module';

import { CertificateRegisterComponent } from './certificate-register.component';


@NgModule({
  declarations: [
    CertificateRegisterComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    NgSelectModule,
    CertificateRegisterRoutingModule
  ],
  providers: [DatePipe],
  bootstrap: [CertificateRegisterComponent]
})
export class CertificateRegisterModule { }
