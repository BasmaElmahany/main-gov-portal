import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { GetGovTours } from '../Models/govtours';
import { ActivatedRoute, Router } from '@angular/router';
import { GovToursService } from '../Services/govTours/gov-tours.service';
import { LanguageService } from '../../Shared/Services/language.service';

@Component({
  selector: 'app-gov-tour-details',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatProgressSpinnerModule],
  templateUrl: './gov-tour-details.component.html',
  styleUrl: './gov-tour-details.component.scss'
})
export class GovTourDetailsComponent implements OnInit {
  id!: string;
  loading = true;
  tour?: GetGovTours;

  constructor(
    private route: ActivatedRoute,
    private service: GovToursService,
    public lang: LanguageService,
    private router: Router
  ) {
    const state = history.state as { id?: string };

    if (!state?.id) {
      // user refreshed or opened URL directly
      this.router.navigate(['/gov-tours']);
      return;
    }

    this.id = state.id;
  }

  ngOnInit(): void {
   // const id = this.route.snapshot.paramMap.get('id')!;
    this.service.getById(this.id).subscribe(res => {
      this.tour = res.data;
      this.loading = false;
    });
  }

  title(): string {
    return this.lang.current === 'ar'
      ? this.tour!.titleAr
      : this.tour!.titleEn;
  }

  article(): string {
    return this.lang.current === 'ar'
      ? this.tour!.articleAr
      : this.tour!.articleEn;
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