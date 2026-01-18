import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { LanguageService } from '../../Shared/Services/language.service';
import { Leader } from '../Models/leader';

@Component({
  selector: 'app-leader-profile',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './leader-profile.component.html',
  styleUrl: './leader-profile.component.scss'
})
export class LeaderProfileComponent {
  @Input() leader!: Leader;

  constructor(public lang: LanguageService) {}

  text(ar: string, en: string): string {
    return this.lang.current === 'ar' ? ar : en;
  }

  period(): string {
    const locale = this.lang.current === 'ar' ? 'ar-EG' : 'en-US';
    const start = new Date(this.leader.startDate).toLocaleDateString(locale);

    if (!this.leader.isEnded || this.leader.endDate === '0001-01-01') {
      return this.lang.current === 'ar'
        ? `${start} – حتى الآن`
        : `${start} – Present`;
    }

    const end = new Date(this.leader.endDate).toLocaleDateString(locale);
    return `${start} – ${end}`;
  }

  photo(): string {
    return this.leader.photoUrl
      ? `https://shusha.minya.gov.eg:93${this.leader.photoUrl}`
      : 'assets/images/avatar-placeholder.png';
  }
}
