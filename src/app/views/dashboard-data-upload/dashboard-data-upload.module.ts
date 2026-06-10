import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatePipe } from '@angular/common';
import { DashboardDataUploadRoutingModule } from './dashboard-data-upload-routing.module';
import { DashboardDataUploadComponent } from './dashboard-data-upload.component';
import { FormsModule } from '@angular/forms';
import { SpinnerModule } from '@coreui/angular-pro';

@NgModule({
  declarations: [
    DashboardDataUploadComponent
  ],
  imports: [
    CommonModule,
    DashboardDataUploadRoutingModule,
    FormsModule,
    SpinnerModule
  ],
  providers: [DatePipe]
})
export class DashboardDataUploadModule { }
