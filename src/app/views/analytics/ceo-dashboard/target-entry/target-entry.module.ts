import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TargetEntryRoutingModule } from './target-entry-routing.module';
import { FormsModule } from '@angular/forms';
import { TargetEntryComponent } from './target-entry.component';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,FormsModule,
    TargetEntryRoutingModule
  ]
})
export class TargetEntryModule { }
