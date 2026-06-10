import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

// Routing
import { ProfileRoutingModule } from './profile-routing.module';

import { ProfileComponent } from './profile.component';

@NgModule({
  declarations: [
  ],
  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    ProfileRoutingModule
  ],
  providers: []
  
  
})
export class ProfileModule { }
