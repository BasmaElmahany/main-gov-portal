import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { GetNews } from '../Models/news';
import { ActivatedRoute, Router } from '@angular/router';
import { NewsService } from '../Services/news/news.service';
import { LanguageService } from '../../Shared/Services/language.service';

@Component({
  selector: 'app-news-details',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatProgressSpinnerModule],
  templateUrl: './news-details.component.html',
  styleUrl: './news-details.component.scss'
})
export class NewsDetailsComponent implements OnInit {
  id!: string;
  loading = true;
  news?: GetNews;

  constructor(
    private route: ActivatedRoute,
    private service:NewsService,
    public lang: LanguageService,
    private router: Router
  ) {
    const state = history.state as { id?: string };

    if (!state?.id) {
      // user refreshed or opened URL directly
      this.router.navigate(['/news']);
      return;
    }

    this.id = state.id;
  }

  ngOnInit(): void {
   // const id = this.route.snapshot.paramMap.get('id')!;
    this.service.getById(this.id).subscribe(res => {
      this.news = res.data;
      this.loading = false;
    });
  }

  title(): string {
    return this.lang.current === 'ar'
      ? this.news!.titleAr
      : this.news!.titleEn;
  }

  article(): string {
    return this.lang.current === 'ar'
      ? this.news!.articleAr
      : this.news!.articleEn;
  }
  imageUrl(path: string): string {
    return `https://shusha.minya.gov.eg:93${path}`;
  }


  formatDate(date: string): string {
    const locale = this.lang.current === 'ar' ? 'ar-EG' : 'en-US';

    return new Intl.DateTimeFormat(locale, {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(new Date(date));
  }
}