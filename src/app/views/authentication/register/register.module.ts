import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

// Routing
import { RegisterRoutingModule } from './register-routing.module';

import { RegisterComponent } from './register.component';

@NgModule({
  declarations: [
    RegisterComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    RegisterRoutingModule
  ],
  providers: [],
  bootstrap: [RegisterComponent]
})
export class RegisterModule { }
