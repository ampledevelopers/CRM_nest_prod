import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuoteConversionReportComponent } from './quote-conversion-report.component';

const routes: Routes = [
  {
    path: '',
    component: QuoteConversionReportComponent,
    data: {
      title: 'Quote Conversion Report'
    }
  }
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuoteConversionReportRoutingModule { }
