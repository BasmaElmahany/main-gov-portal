import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Router, RouterModule } from '@angular/router';
import { LanguageService } from '../../../../Shared/Services/language.service';
import { CultureCentersService } from '../../../Services/culturecenters/culturecenters.service';
import { CultureCenter } from '../../../Models/culturecenters';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Subscription } from 'rxjs';

@Component({
	selector: 'app-culturecenters',
	standalone: true,
	imports: [
		CommonModule,
		RouterModule,
		MatCardModule,
		MatIconModule,
		MatProgressSpinnerModule,
		MatButtonModule,
		MatTooltipModule,
		FormsModule,
		MatInputModule,
		MatSelectModule
	],
	templateUrl: './culturecenters.component.html',
	styleUrls: ['./culturecenters.component.scss']
})
export class CulturecentersComponent implements OnInit, OnDestroy {
	loading = true;
	culturecenters: CultureCenter[] = [];
	filteredCulturecenters: CultureCenter[] = [];
	// Pagination Properties
	currentPage: number = 1;
	pageSize: number = 6;
	pageSizeOptions: number[] = [3, 6, 9, 12, 15];
	totalPages: number = 0;
	totalItems: number = 0;
	// View Options
	viewMode: 'grid' | 'list' = 'grid';
	// Filter Properties
	searchQuery: string = '';
	// Responsive Properties
	isMobile: boolean = false;
	screenWidth: number = window.innerWidth;
	// Track broken images
	brokenImages: Set<string> = new Set();
	private resizeSubscription?: Subscription;

	constructor(
		private culturecentersService: CultureCentersService,
		public lang: LanguageService,
		private router: Router
	) {}

	ngOnInit(): void {
		this.checkScreenSize();
		this.loadCulturecenters();
	}

	ngOnDestroy(): void {
		if (this.resizeSubscription) {
			this.resizeSubscription.unsubscribe();
		}
	}

	@HostListener('window:resize', ['$event'])
	onResize(event: any) {
		this.screenWidth = window.innerWidth;
		this.checkScreenSize();
		this.adjustPageSizeForScreen();
	}

	private checkScreenSize(): void {
		this.isMobile = this.screenWidth <= 768;
	}

	private adjustPageSizeForScreen(): void {
		if (this.screenWidth <= 480) {
			this.pageSize = 3;
		} else if (this.screenWidth <= 768) {
			this.pageSize = 4;
		} else if (this.screenWidth <= 1024) {
			this.pageSize = 6;
		} else {
			this.pageSize = 8;
		}
		this.calculatePagination();
	}

	loadCulturecenters(): void {
		this.loading = true;
		this.culturecentersService.getAllCultureCenters().subscribe({
			next: (res: any) => {
				this.culturecenters = Array.isArray(res) ? res : (res.data ? res.data : []);
				this.filteredCulturecenters = [...this.culturecenters];
				this.totalItems = this.culturecenters.length;
				this.calculatePagination();
				this.loading = false;
			},
			error: (err) => {
				this.culturecenters = [];
				this.filteredCulturecenters = [];
				this.loading = false;
			}
		});
	}

	// Pagination Methods
	calculatePagination(): void {
		if (!this.filteredCulturecenters || this.filteredCulturecenters.length === 0) {
			this.totalPages = 0;
			return;
		}
		this.totalPages = Math.ceil(this.filteredCulturecenters.length / this.pageSize);
		if (this.currentPage > this.totalPages) {
			this.currentPage = this.totalPages || 1;
		}
		this.totalItems = this.filteredCulturecenters.length;
	}

	get paginatedCulturecenters(): CultureCenter[] {
		if (!this.filteredCulturecenters || this.filteredCulturecenters.length === 0) {
			return [];
		}
		const startIndex = (this.currentPage - 1) * this.pageSize;
		const endIndex = startIndex + this.pageSize;
		return this.filteredCulturecenters.slice(startIndex, endIndex);
	}

	goToPage(page: number): void {
		if (page >= 1 && page <= this.totalPages) {
			this.currentPage = page;
			this.scrollToTop();
		}
	}

	goToFirstPage(): void {
		this.goToPage(1);
	}

	goToLastPage(): void {
		this.goToPage(this.totalPages);
	}

	goToPreviousPage(): void {
		this.goToPage(this.currentPage - 1);
	}

	goToNextPage(): void {
		this.goToPage(this.currentPage + 1);
	}

	changePageSize(newSize: number): void {
		this.pageSize = newSize;
		this.currentPage = 1;
		this.calculatePagination();
	}

	getPageNumbers(): number[] {
		const pages: number[] = [];
		const maxVisiblePages = this.isMobile ? 3 : 5;
		if (this.totalPages <= maxVisiblePages) {
			for (let i = 1; i <= this.totalPages; i++) {
				pages.push(i);
			}
		} else {
			let startPage = Math.max(1, this.currentPage - Math.floor(maxVisiblePages / 2));
			let endPage = startPage + maxVisiblePages - 1;
			if (endPage > this.totalPages) {
				endPage = this.totalPages;
				startPage = Math.max(1, endPage - maxVisiblePages + 1);
			}
			for (let i = startPage; i <= endPage; i++) {
				pages.push(i);
			}
		}
		return pages;
	}

	// Filter Methods
	onSearch(): void {
		if (!this.searchQuery.trim()) {
			this.filteredCulturecenters = [...this.culturecenters];
		} else {
			const query = this.searchQuery.toLowerCase().trim();
			this.filteredCulturecenters = this.culturecenters.filter(center => {
				const nameAr = center.nameAr?.toLowerCase() || '';
				const nameEn = center.nameEn?.toLowerCase() || '';
				const dirNameAr = center.dirNameAr?.toLowerCase() || '';
				const dirNameEn = center.dirNameEn?.toLowerCase() || '';
				return nameAr.includes(query) || nameEn.includes(query) || dirNameAr.includes(query) || dirNameEn.includes(query);
			});
		}
		this.currentPage = 1;
		this.calculatePagination();
	}

	clearSearch(): void {
		this.searchQuery = '';
		this.onSearch();
	}

	// View Mode Methods
	toggleViewMode(): void {
		this.viewMode = this.viewMode === 'grid' ? 'list' : 'grid';
	}

	// Image Error Handling
	onImageError(event: Event, center: CultureCenter): void {
		const imgElement = event.target as HTMLImageElement;
		imgElement.src = 'assets/placeholder.jpg';
		if (center.photoUrl) {
			this.brokenImages.add(center.photoUrl);
		}
	}

	// Utility Methods
	private scrollToTop(): void {
		window.scrollTo({
			top: 0,
			behavior: 'smooth'
		});
	}

	title(c: CultureCenter): string {
		return this.lang.current === 'ar' ? (c.nameAr || 'بدون عنوان') : (c.nameEn || 'No Title');
	}

	excerpt(c: CultureCenter): string {
		const text = this.lang.current === 'ar'
			? (c.addressAr || '')
			: (c.addressEn || '');
		const maxLength = this.viewMode === 'list' ? 100 : 120;
		return text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
	}

	cover(c: CultureCenter): string {
		if (!c.photoUrl) {
			return 'assets/placeholder.jpg';
		}
		if (this.brokenImages.has(c.photoUrl)) {
			return 'assets/placeholder.jpg';
		}
		let fullUrl = c.photoUrl;
		if (!fullUrl.startsWith('http')) {
			if (fullUrl.startsWith('/')) {
				fullUrl = `https://shusha.minya.gov.eg:93${fullUrl}`;
			} else {
				fullUrl = `https://shusha.minya.gov.eg:93/${fullUrl}`;
			}
		}
		return fullUrl;
	}

	openDetails(id: string): void {
		this.router.navigate(['/culturecenters/details'], { state: { id } });
	}

	getPaginationInfo(): string {
		if (this.filteredCulturecenters.length === 0) {
			return this.lang.current === 'ar' ? 'لا توجد بيانات' : 'No data available';
		}
		const start = (this.currentPage - 1) * this.pageSize + 1;
		const end = Math.min(this.currentPage * this.pageSize, this.totalItems);
		if (this.lang.current === 'ar') {
			return `عرض ${start}-${end} من ${this.totalItems}`;
		} else {
			return `Showing ${start}-${end} of ${this.totalItems}`;
		}
	}

	getPageSizeLabel(): string {
		if (this.lang.current === 'ar') {
			return `عناصر في الصفحة: ${this.pageSize}`;
		} else {
			return `Items per page: ${this.pageSize}`;
		}
	}
}
