import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FooterComponent } from '@coreui/angular-pro';

@Component({
  selector: 'app-default-footer',
  templateUrl: './default-footer.component.html',
  styleUrls: ['./default-footer.component.scss'],
  standalone: true,
  providers: [FooterComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class DefaultFooterComponent extends FooterComponent {
  constructor() {
    super();
  }
}
