import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';


import { RouterModule } from '@angular/router';
import { TranslatePipe } from '../../Shared/Pipes/translate.pipe';
import { DataService } from '../../Shared/Services/data/data.service';
import { LanguageService } from '../../Shared/Services/language.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatChipsModule,
    MatButtonModule,
    MatTabsModule,
    MatIconModule,
    TranslatePipe, RouterModule
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {


  adsImages = [
    '/assets/images/gettyimages-519020152-170667a.jpg',
    '/assets/sections/ad-2.jpg',
    '/assets/sections/ad-3.jpg',
  ];

  toursImages = [
    '/assets/images/gettyimages-519020152-170667a.jpg',
    '/assets/sections/tour-2.jpg',
    '/assets/sections/tour-3.jpg',
  ];

  miscLinks = [
    { path: '/about', label: 'nav.about' },
    { path: '/tourism', label: 'nav.tourism' },
    { path: '/entities', label: 'nav.entities' },
    { path: '/services', label: 'nav.services' },
    { path: '/archive', label: 'nav.archive' },
  ];

  newLinks = [
    { path: '/services', label: 'nav.services' },
    { path: '/archive', label: 'nav.archive' },
    { path: '/leaders', label: 'nav.leaders' },
    { path: '/contact', label: 'nav.contact' },
  ];

  monthItems = [
    {
      img: '/assets/images/gettyimages-519020152-170667a.jpg',
      date: this.lang.current === 'ar' ? '09 ديسمبر 2025' : 'Dec 09, 2025',
      title: { ar: 'افتتاح مشروع خدمي جديد', en: 'Opening a new service project' }
    },
    {
      img: '/assets/sections/month-2.jpg',
      date: this.lang.current === 'ar' ? '11 ديسمبر 2025' : 'Dec 11, 2025',
      title: { ar: 'حملة ميدانية لمتابعة الانضباط', en: 'Field campaign to ensure compliance' }
    },
    {
      img: '/assets/sections/month-3.jpg',
      date: this.lang.current === 'ar' ? '15 ديسمبر 2025' : 'Dec 15, 2025',
      title: { ar: 'اجتماع تنسيقي لملفات الخدمات', en: 'Coordination meeting on services' }
    }
  ];


  todayISO = new Date().toISOString();


  constructor(public data: DataService, public lang: LanguageService) { }

  text(localized: { ar: string; en: string }) {
    return this.lang.current === 'ar' ? localized.ar : localized.en;
  }

  // Optional: simple “service icon mapping”
  iconForService(category: string) {
    switch (category) {
      case 'health': return 'local_hospital';
      case 'education': return 'school';
      case 'social': return 'diversity_3';
      case 'investment': return 'business_center';
      case 'utilities': return 'account_balance';
      default: return 'public';
    }
  }
}
