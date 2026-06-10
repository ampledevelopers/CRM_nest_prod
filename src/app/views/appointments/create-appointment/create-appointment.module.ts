import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreateAppointmentRoutingModule } from './create-appointment-routing.module';
import { CreateAppointmentComponent } from './create-appointment.component';


@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    CreateAppointmentRoutingModule
  ]
})
export class CreateAppointmentModule { }
