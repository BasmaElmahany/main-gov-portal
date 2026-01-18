import { CommonModule } from '@angular/common';
import { Component, OnInit, HostListener } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { LanguageService } from '../../../../Shared/Services/language.service';
import { SocialSocietiesService } from '../../../Services/socialSocieties/socialsocieties.service';
import { SocialSociety } from '../../../Models/socialsocieties';

@Component({
  selector: 'app-socialsocieties-details',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatCardModule,
    RouterModule
  ],
  templateUrl: './socialsocieties-details.component.html',
  styleUrls: ['./socialsocieties-details.component.scss']
})
export class SocialSocietiesDetailsComponent implements OnInit {
  id!: string;
  loading = true;
  socialSociety?: SocialSociety;
  private brokenImages: Set<string> = new Set();
  isMobile: boolean = false;
  screenWidth: number = window.innerWidth;

  constructor(
    private route: ActivatedRoute,
    private service: SocialSocietiesService,
    public lang: LanguageService,
    private router: Router
  ) {
    const state = history.state as { id?: string };
    if (!state?.id) {
      this.router.navigate(['/socialsocieties']);
      return;
    }
    this.id = state.id;
    this.checkScreenSize();
  }

  ngOnInit(): void {
    this.loadSocialSocietyDetails();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.screenWidth = window.innerWidth;
    this.checkScreenSize();
  }

  private checkScreenSize(): void {
    this.isMobile = this.screenWidth <= 768;
  }

  loadSocialSocietyDetails(): void {
    this.loading = true;
    this.service.getbyId(this.id).subscribe({
      next: (res: any) => {
        const rawData = res.data ? res.data : res;
        if (rawData) {
          if (rawData.dirphotoUrl && !rawData.dirPhotoUrl) {
            rawData.dirPhotoUrl = rawData.dirphotoUrl;
          }
        }
        this.socialSociety = rawData;
        this.loading = false;
      },
      error: (error) => {
        this.loading = false;
      }
    });
  }

  imageUrl(path: string | undefined): string {
    if (!path || this.brokenImages.has(path)) {
      return 'assets/placeholder.jpg';
    }
    let fullUrl = path;
    if (!fullUrl.startsWith('http')) {
      const baseUrl = 'https://shusha.minya.gov.eg:93';
      fullUrl = fullUrl.startsWith('/') ? `${baseUrl}${fullUrl}` : `${baseUrl}/${fullUrl}`;
    }
    return fullUrl;
  }

  handleImageError(event: Event): void {
    const imgElement = event.target as HTMLImageElement;
    const src = imgElement.src;
    this.brokenImages.add(src);
    imgElement.src = 'assets/placeholder.jpg';
  }

  goToLink(url: string | undefined): void {
    if (url) {
      const externalUrl = url.startsWith('http') ? url : `https://${url}`;
      window.open(externalUrl, '_blank');
    }
  }

  title(): string {
    if (!this.socialSociety) return '';
    return this.lang.current === 'ar'
      ? (this.socialSociety.nameAr || 'بدون عنوان')
      : (this.socialSociety.nameEn || 'No Title');
  }

  makePhoneCall(phoneNumber: string): void {
    if (!phoneNumber) return;
    window.location.href = `tel:${phoneNumber.replace(/\D/g, '')}`;
  }

  sendEmail(email: string): void {
    if (!email) return;
    const subject = encodeURIComponent(this.lang.current === 'ar' ? `استفسار عن ${this.title()}` : `Inquiry about ${this.title()}`);
    window.location.href = `mailto:${email}?subject=${subject}`;
  }

  goBack(): void {
    this.router.navigate(['/socialsocieties']);
  }
}
