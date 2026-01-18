import { CommonModule } from '@angular/common';
import { Component, OnInit, HostListener } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { LanguageService } from '../../../../Shared/Services/language.service';
import { CultureCentersService } from '../../../Services/culturecenters/culturecenters.service';
import { CultureCenter } from '../../../Models/culturecenters';

@Component({
	selector: 'app-culturecenters-details',
	standalone: true,
	imports: [
		CommonModule,
		MatIconModule,
		MatProgressSpinnerModule,
		MatButtonModule,
		MatCardModule,
		RouterModule
	],
	templateUrl: './culturecenters-details.component.html',
	styleUrls: ['./culturecenters-details.component.css']
})
export class CultureCentersDetailsComponent implements OnInit {
	id!: string;
	loading = true;
	cultureCenter?: CultureCenter;
	private brokenImages: Set<string> = new Set();
	isMobile: boolean = false;
	screenWidth: number = window.innerWidth;

	constructor(
		private route: ActivatedRoute,
		private service: CultureCentersService,
		public lang: LanguageService,
		private router: Router
	) {
		const state = history.state as { id?: string };
		if (!state?.id) {
			this.router.navigate(['/culturecenters']);
			return;
		}
		this.id = state.id;
		this.checkScreenSize();
	}

	ngOnInit(): void {
		this.loadCultureCenterDetails();
	}

	@HostListener('window:resize', ['$event'])
	onResize(event: any) {
		this.screenWidth = window.innerWidth;
		this.checkScreenSize();
	}

	private checkScreenSize(): void {
		this.isMobile = this.screenWidth <= 768;
	}

	loadCultureCenterDetails(): void {
		this.loading = true;
		this.service.getbyId(this.id).subscribe({
			next: (res: any) => {
				const rawData = res.data ? res.data : res;
				if (rawData) {
					if (rawData.dirphotoUrl && !rawData.dirPhotoUrl) {
						rawData.dirPhotoUrl = rawData.dirphotoUrl;
					}
				}
				this.cultureCenter = rawData;
				this.loading = false;
			},
			error: (error) => {
				console.error('Error loading culture center:', error);
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
		if (!this.cultureCenter) return '';
		return this.lang.current === 'ar'
			? (this.cultureCenter.nameAr || 'بدون عنوان')
			: (this.cultureCenter.nameEn || 'No Title');
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
		this.router.navigate(['/culturecenters']);
	}
}
