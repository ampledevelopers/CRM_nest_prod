import { Injectable } from '@angular/core';

declare global {
  interface Window { dataLayer: any[]; gtag: any; }
}


@Injectable({
  providedIn: 'root'
})
export class GoogleAnalyticsService {
  loadGoogleAnalytics(): void {
    // Load the Google Analytics script dynamically
    const script = document.createElement('script');
    script.src = "https://www.googletagmanager.com/gtag/js?id=G-MBQY631RGR";
    document.head.appendChild(script);

    // Initialize Google Analytics
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    window.gtag('js', new Date());
    window.gtag('config', 'G-MBQY631RGR');

  }

  trackPageView(): void {
    // Track the pageview for the specific page
    window.gtag('config', 'G-MBQY631RGR', {
      page_path: '/CEO-dashboard'
    });
  }
}

