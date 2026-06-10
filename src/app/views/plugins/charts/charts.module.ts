import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule} from '@angular/common/http';

import { BadgeModule, CardModule, GridModule } from '@coreui/angular-pro';
import { ChartjsModule } from '@coreui/angular-chartjs';

import { ChartsComponent } from './charts.component';
import { ChartsRoutingModule } from './charts-routing.module';
import { DocsComponentsModule } from '@docs-components/docs-components.module';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { FormsModule } from '@angular/forms';
@NgModule({
  declarations: [ChartsComponent],
  imports: [
    CommonModule,
    ChartsRoutingModule,
    ChartjsModule,
    CardModule,
    GridModule,
    BadgeModule,
    DocsComponentsModule,
    AngularEditorModule,
    HttpClientModule,
    FormsModule
  ]
})
export class ChartsModule {
}
