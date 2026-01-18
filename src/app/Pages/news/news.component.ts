import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { GetNews } from '../Models/news';
import { NewsService } from '../Services/news/news.service';
import { LanguageService } from '../../Shared/Services/language.service';
import { NewsSidebarComponent } from '../news-sidebar/news-sidebar.component';

@Component({
  selector: 'app-news',
  standalone: true,
  imports: [CommonModule,
    RouterModule,
    MatCardModule,
    MatIconModule,
    MatProgressSpinnerModule, RouterModule,NewsSidebarComponent],
  templateUrl: './news.component.html',
  styleUrl: './news.component.scss'
})
export class NewsComponent implements OnInit {

  loading = true;
  news: GetNews[] = [];

  constructor(
    private service: NewsService,
    public lang: LanguageService,  private router: Router, private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
  this.route.queryParamMap.subscribe(params => {
    const typeIdParam = params.get('typeId');

    if (typeIdParam) {
      const typeId = Number(typeIdParam);
      this.loadByType(typeId);
    } else {
      this.loadAll();
    }
  });
}
private loadAll(): void {
  this.loading = true;

  this.service.getAll().subscribe({
    next: res => {
      this.news = res.data;
      this.loading = false;
    },
    error: () => (this.loading = false)
  });
}

private loadByType(typeId: number): void {
  this.loading = true;

  this.service.getByTypeId(typeId).subscribe({
    next: res => {
      this.news = res.data;
      this.loading = false;
    },
    error: () => (this.loading = false)
  });
}


  title(t: GetNews): string {
    return this.lang.current === 'ar' ? t.titleAr : t.titleEn;
  }

  excerpt(t: GetNews): string {
    const text = this.lang.current === 'ar' ? t.articleAr : t.articleEn;
    return text.length > 180 ? text.slice(0, 180) + '...' : text;
  }

  cover(t: GetNews): string {

    return t.photos?.length
      ?`https://shusha.minya.gov.eg:93${t.photos[0].photoUrl}`
      : '/assets/placeholder.jpg';
  }
  formatDate(date: string): string {
  const locale = this.lang.current === 'ar' ? 'ar-EG' : 'en-US';

  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(new Date(date));
}

openDetails(id: string): void {
  this.router.navigate(
    ['/news/details'],
    { state: { id } }
  );
}
}