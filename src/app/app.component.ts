import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { IconSetService } from '@coreui/icons-angular';
import { iconSubset } from './icons/icon-subset';
import { Title } from '@angular/platform-browser';
import { cacheClearer } from './cache-clearer';
import { SwUpdate } from '@angular/service-worker';
import  { RouterModule } from '@angular/router';
@Component({
  // tslint:disable-next-line:component-selector
  selector: 'body',
  template: '<router-outlet></router-outlet>',
  standalone: false
})
export class AppComponent implements OnInit {
  title = 'Ample iCare CRM 3.1';

  constructor(
    private router: Router,
    private titleService: Title,
    private iconSetService: IconSetService,
    private swUpdate: SwUpdate
  ) {
    titleService.setTitle(this.title);
    // iconSet singleton
    iconSetService.icons = { ...iconSubset };
  }

  ngOnInit(): void {
    cacheClearer(this.swUpdate); //enable for auto cache clear
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
    });
    // Auto logout between 9:00 PM and 9:02 PM; remove getMinutes() check for 9 PM sharp
    setInterval(() => {
      if (!localStorage.getItem('userToken')) return;
      const d = new Date();
      if (d.getHours() === 21 && d.getMinutes() <= 2) {
        alert('Session expired. You will be logged out now.');
        localStorage.clear();
        this.router.navigate(['/login']);
      }
    }, 60000);
  }
}
