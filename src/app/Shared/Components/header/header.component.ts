import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDividerModule } from '@angular/material/divider';
import { MatMenuTrigger } from '@angular/material/menu';
import { TranslatePipe } from '../../Pipes/translate.pipe';
import { DataService, NewsItem } from '../../Services/data/data.service';
import { LanguageService } from '../../Services/language.service';
import { NewsTypes } from '../../../Pages/Models/news';
import { NewsTypesService } from '../../../Pages/Services/newsTypes/news-types.service';
type MegaItem = { key: string; path: string; icon: string; descKey?: string };

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule, RouterLink, RouterLinkActive, ReactiveFormsModule,
    MatToolbarModule, MatButtonModule, MatIconModule, MatMenuModule,
    MatFormFieldModule, MatInputModule, MatDividerModule,
    TranslatePipe, MatMenuTrigger
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  private destroyRef = inject(DestroyRef);
  private megaCloseTimer: any = null;
  q = new FormControl<string>('', { nonNullable: true });
  isMenuOpen = signal(false);
  isHoveringOverMenu = false; // Track if hovering over the menu

  // ✅ live clock
  now = signal(new Date());



  dataSource: NewsTypes[] = [];


  loading = true;




  // Top-level nav (keep as-is)
  nav = [
    { path: '/home', key: 'nav.home' },
    { path: '/leaders', key: 'nav.leaders' },
    { path: '/govtours', key: 'nav.govtours' },
    { path: '/tourism', key: 'nav.tourism' },
    { path: '/investment', key: 'nav.investment' },
    { path: '/contact', key: 'nav.contact' },
    { path: '/about', key: 'nav.about' },
  ];

  // ✅ Mega menus (icons + groups)
  servicesMega: { titleKey: string; items: MegaItem[] }[] = [
    {
      titleKey: 'nav.services',
      items: [
        { key: 'nav.health', path: '/health', icon: 'local_hospital' },
        { key: 'nav.education', path: '/education', icon: 'school' },
        { key: 'nav.socialServices', path: '/social-services', icon: 'diversity_3' },
        { key: 'nav.services', path: '/services', icon: 'apps' },
      ]
    },
    {
      titleKey: 'home.quickServices',
      items: [
        { key: 'services.category.utilities', path: '/services?cat=utilities', icon: 'account_balance' },
        { key: 'services.category.investment', path: '/services?cat=investment', icon: 'business_center' },
        { key: 'services.category.citizen', path: '/services?cat=citizen', icon: 'support_agent' },
        { key: 'services.category.permits', path: '/services?cat=permits', icon: 'verified' },
      ]
    },
    {
      titleKey: 'nav.contact',
      items: [
        { key: 'footer.phone', path: '/contact', icon: 'call' },
        { key: 'footer.email', path: '/contact', icon: 'mail' },
        { key: 'search.placeholder', path: '/services', icon: 'search' },
      ]
    }
  ];

  entitiesMega: { titleKey: string; items: MegaItem[] }[] = [
    {
      titleKey: 'nav.entities',
      items: [
        { key: 'entities.departments', path: '/entities?type=departments', icon: 'apartment' },
        { key: 'entities.directorates', path: '/directorates', icon: 'account_balance' },
        { key: 'entities.centers', path: '/entities?type=centers', icon: 'location_city' },
        { key: 'entities.culturecenters', path: '/culturecenters', icon: 'theaters' },
        { key: 'entities.socialsocieties', path: '/socialsocieties', icon: 'diversity_3' },
        { key: 'entities.authorities', path: '/entities?type=authorities', icon: 'gavel' },
      ]
    },
    {
      titleKey: 'nav.leaders',
      items: [
        { key: 'leaders.governor', path: '/leaders', icon: 'person' },
        { key: 'leaders.officials', path: '/leaders', icon: 'groups' },
      ]
    },
    {
      titleKey: 'nav.tourism',
      items: [
        { key: 'tourism.attractions', path: '/tourism', icon: 'temple_buddhist' },
        { key: 'tourism.hotels', path: '/tourism?tab=hotels', icon: 'hotel' },
      ]
    }
  ];

  archiveMega: { titleKey: string; items: MegaItem[] }[] = [
    {
      titleKey: 'nav.archive',
      items: [
        { key: 'archive.news', path: '/archive?tab=news', icon: 'article' },
        { key: 'archive.announcements', path: '/archive?tab=announcements', icon: 'campaign' },
        { key: 'archive.documents', path: '/archive?tab=documents', icon: 'description' },
        { key: 'archive.media', path: '/archive?tab=media', icon: 'ondemand_video' },
      ]
    },
    {
      titleKey: 'nav.services',
      items: [
        { key: 'services.apply', path: '/services', icon: 'assignment' },
        { key: 'services.track', path: '/services', icon: 'track_changes' },
      ]
    },
    {
      titleKey: 'nav.about',
      items: [
        { key: 'footer.about', path: '/about', icon: 'info' },
        { key: 'nav.contact', path: '/contact', icon: 'support_agent' },
      ]
    }
  ];

  constructor(
    public lang: LanguageService,
    public data: DataService,
    private router: Router, private typeservice: NewsTypesService,
  ) {
    const id = setInterval(() => this.now.set(new Date()), 1000);
    this.destroyRef.onDestroy(() => clearInterval(id));
  }

  get langDir(): 'rtl' | 'ltr' {
    return this.lang.dir;
  }

  // ✅ Template-safe: pre-filter in TS
  get tickerItems(): NewsItem[] {
    const list = this.data.news.filter(n => n.tag === 'announcement');
    return list.length ? list : this.data.news;
  }

  tickerText(item: NewsItem): string {
    return this.lang.current === 'ar' ? item.title.ar : item.title.en;
  }

  // Active helpers for mega triggers
  isActivePrefix(prefix: string) {
    return this.router.url.startsWith(prefix);
  }

  toggleLang() { this.lang.toggle(); }

  submitSearch() {
    const query = this.q.value.trim();
    this.router.navigate(['/services'], { queryParams: { q: query || null } });
  }

  openMega(trig: MatMenuTrigger) {
    if (!trig.menuOpen) { // Ensure the menu is not already open
      this.clearMegaClose();
      trig.openMenu();
    }
  }

  scheduleMegaClose(trig: MatMenuTrigger, delay = 120) {
    if (trig.menuOpen) { // Ensure the menu is open before scheduling close
      this.clearMegaClose();
      this.megaCloseTimer = setTimeout(() => {
        if (!this.isHoveringOverMenu) { // Close only if not hovering over the menu
          trig.closeMenu();
        }
      }, delay);
    }
  }

  clearMegaClose() {
    if (this.megaCloseTimer) {
      clearTimeout(this.megaCloseTimer);
      this.megaCloseTimer = null;
    }
  }

  onMenuHover(isHovering: boolean) {
    this.isHoveringOverMenu = isHovering;
  }




  ngOnInit(): void {
    this.typeservice.getAllNewsTypes().subscribe({
      next: data => {
        this.dataSource = data;
        this.loading = false;
      },
      error: () => this.loading = false
    });
  }
  getNewsTypeName(type: NewsTypes): string {
    return this.lang.current === 'ar'
      ? type.nameAr
      : type.nameEn;
  }

  goToNewsType(typeId: number) {
    this.router.navigate(['/news'], {
      queryParams: { typeId }
    });
  }
}
