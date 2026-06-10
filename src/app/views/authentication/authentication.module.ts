
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Routing
import { AuthenticationRoutingModule } from './authentication-routing';

@NgModule({
  imports: [
    AuthenticationRoutingModule,
    NgSelectModule,
    CommonModule,
    FormsModule
  ],
  declarations: []
})
export class AuthenticationModule { }
