import { Component, OnInit } from '@angular/core';
import { LeaderService } from '../Services/leaders/leader.service';
import { Leader } from '../Models/leader';
import { LanguageService } from '../../Shared/Services/language.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LeaderProfileComponent } from '../leader-profile/leader-profile.component';
@Component({
  selector: 'app-leaders',
  standalone: true,
  imports: [CommonModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule, LeaderProfileComponent],
  templateUrl: './leaders.component.html',
  styleUrl: './leaders.component.scss'
})
export class LeadersComponent implements OnInit {

  loading = true;
  leaders: Leader[] = [];

  constructor(
    private leaderService: LeaderService,
    public lang: LanguageService
  ) { }

  ngOnInit(): void {
    this.fetchLeaders();
  }

  private fetchLeaders(): void {
    this.loading = true;

    this.leaderService.getLeaders().subscribe({
      next: res => {
        const list = res.data ?? [];

        // 🔥 SORT BY OFFICIAL HIERARCHY
        this.leaders = list.sort(
          (a, b) =>
            this.getPositionRank(a) - this.getPositionRank(b)
        );

        this.loading = false;
      },
      error: err => {
        console.error('Failed to load leaders', err);
        this.loading = false;
      }
    });
  }

  /* ===============================
     Language helpers
  =============================== */

  name(l: Leader): string {
    return this.lang.current === 'ar' ? l.nameAr : l.nameEn;
  }

  position(l: Leader): string {
    return this.lang.current === 'ar' ? l.positionAr : l.positionEn;
  }

  /* ===============================
     Image helper
  =============================== */

  image(url?: string): string {
    return url
      ? `https://shusha.minya.gov.eg:93${url}`
      : 'assets/images/avatar-placeholder.png';
  }

  /* ===============================
     Period logic (IMPORTANT)
  =============================== */

  period(l: Leader): string {
    if (!l.startDate) return '';

    const locale = this.lang.current === 'ar' ? 'ar-EG' : 'en-US';

    const start = new Date(l.startDate).toLocaleDateString(locale);

    const hasValidEnd =
      l.isEnded &&
      l.endDate &&
      l.endDate !== '0001-01-01';

    if (!hasValidEnd) {
      return this.lang.current === 'ar'
        ? `${start} – حتى الآن`
        : `${start} – Present`;
    }

    const end = new Date(l.endDate!).toLocaleDateString(locale);
    return `${start} – ${end}`;
  }
  private readonly positionPriority: { keywords: string[]; rank: number }[] = [
    {
      rank: 1,
      keywords: ['محافظ', 'Governor']
    },
    {
      rank: 2,
      keywords: ['نائب المحافظ', 'Deputy Governor']
    },
    {
      rank: 3,
      keywords: ['سكرتير عام', 'Secretary-General of Minya Governorate']
    },
    {
      rank: 4,
      keywords: ['سكرتير عام مساعد', 'Assistant Secretary-General of Minya Governorate']
    }
  ];

 private getPositionRank(leader: Leader): number {
  const en = (leader.positionEn ?? '').toLowerCase();
  const ar = (leader.positionAr ?? '').toLowerCase();

  if (en === 'governor' || ar === 'محافظ') return 1;
  if (en === 'deputy governor' || ar === 'نائب المحافظ') return 2;
  if (en === 'secretary-general of minya governorate' || ar.includes('سكرتير عام') && !ar.includes('مساعد')) return 3;
  if (en === 'assistant secretary-general of minya governorate' || ar.includes('سكرتير عام مساعد')) return 4;

  return 999;
}

}
