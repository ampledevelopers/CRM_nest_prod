import { Component, HostBinding } from '@angular/core';

@Component({
    selector: 'app-mail-toolbar',
    templateUrl: './mail-toolbar.component.html',
    styleUrls: ['./mail-toolbar.component.scss'],
    standalone: false
})
export class MailToolbarComponent {
  @HostBinding('class') hostClass = 'btn-toolbar mb-4';

  constructor() {}
}
