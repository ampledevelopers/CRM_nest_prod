import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CardModule, GridModule } from '@coreui/angular-pro';
import { IconModule } from '@coreui/icons-angular';

import { CoreUIIconsComponent } from './coreui-icons.component';
import { IconsRoutingModule } from './icons-routing.module';
import { DocsComponentsModule } from '@docs-components/docs-components.module';
//import { FlagsComponent } from './flags.component';
import { FontAwesomeComponent } from './font-awesome.component';
import { SimpleLineIconsComponent } from './simple-line-icons.component';

@NgModule({
  imports: [
    IconsRoutingModule,
    CardModule,
    GridModule,
    IconModule,
    CommonModule,
    FontAwesomeModule,
    DocsComponentsModule
  ],
  declarations: [
    CoreUIIconsComponent,
    //FlagsComponent,
    FontAwesomeComponent,
    SimpleLineIconsComponent
  ]
})
export class IconsModule {
}
