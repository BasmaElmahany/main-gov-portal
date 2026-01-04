import { Component, OnInit, OnDestroy } from '@angular/core'; // أضفنا OnInit و OnDestroy
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
    CommonModule, MatCardModule, MatChipsModule, MatButtonModule,
    MatTabsModule, MatIconModule, TranslatePipe, RouterModule
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy { // تنفيذ الواجهات

  sliderData = [
    { bg: 'https://images.unsplash.com/photo-1566127444979-b3d2b654e3d7?q=80&w=1200', color: '#c5a059' },
    { bg: 'https://egyptopia.com/shared/images/z/middle/z_qena-governorate-_3145.jpg', color: '#b11f37' },
    { bg: 'https://thumbs.dreamstime.com/b/suez-canal-egypt-mar-cityscape-ismailia-seen-side-246647293.jpg', color: '#8fa04a' },
    { bg: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1200', color: '#2980b9' } // صورة رابعة
  ];

  activeSlideIndex: number = 0;
  autoPlayInterval: any;

  constructor(public data: DataService, public lang: LanguageService) { }

  ngOnInit(): void {
    this.startAutoPlay();
  }

  ngOnDestroy(): void {
    this.stopAutoPlay();
  }

  startAutoPlay() {
    this.autoPlayInterval = setInterval(() => {
      this.activeSlideIndex = (this.activeSlideIndex + 1) % this.sliderData.length;
    }, 4000); // يقلب كل 4 ثوانٍ
  }

  stopAutoPlay() {
    if (this.autoPlayInterval) {
      clearInterval(this.autoPlayInterval);
    }
  }

  setActiveSlide(index: number) {
    this.activeSlideIndex = index;
    this.stopAutoPlay(); // إعادة ضبط التوقيت عند الاختيار اليدوي
    this.startAutoPlay();
  }

  // --- باقي كود المصفوفات الأصلي دون أي حذف ---
  adsImages = ['/assets/images/gettyimages-519020152-170667a.jpg', '/assets/sections/ad-2.jpg', '/assets/sections/ad-3.jpg'];
  toursImages = ['/assets/images/gettyimages-519020152-170667a.jpg', '/assets/sections/tour-2.jpg', '/assets/sections/tour-3.jpg'];
  miscLinks = [
    { path: '/about', label: 'nav.about' }, { path: '/tourism', label: 'nav.tourism' },
    { path: '/entities', label: 'nav.entities' }, { path: '/services', label: 'nav.services' },
    { path: '/archive', label: 'nav.archive' }
  ];
  newLinks = [
    { path: '/services', label: 'nav.services' }, { path: '/archive', label: 'nav.archive' },
    { path: '/leaders', label: 'nav.leaders' }, { path: '/contact', label: 'nav.contact' }
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
  text(localized: { ar: string; en: string }) { return this.lang.current === 'ar' ? localized.ar : localized.en; }
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