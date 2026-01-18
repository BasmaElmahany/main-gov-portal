import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SocialSocietiesService } from '../../Services/socialsocieties.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-socialsocieties',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatIconModule,
    MatButtonModule,
    MatSelectModule,
    MatCardModule,
    HttpClientModule
  ],
  templateUrl: './socialsocieties.component.html',
  styleUrls: ['./socialsocieties.component.scss']
})
export class SocialSocietiesComponent implements OnInit {
  // Language object (dummy, replace with actual service if needed)
  lang = { current: 'ar' };

  // Search
  searchQuery: string = '';
  onSearch() {}
  clearSearch() { this.searchQuery = ''; }

  // View mode
  viewMode: 'grid' | 'list' = 'grid';

  // Page size selector
  pageSize: number = 10;
  pageSizeOptions: number[] = [10, 20, 50];
  changePageSize(size: number) { this.pageSize = size; }

  // Data
  filteredSocialSocieties: any[] = [];
  paginatedSocialSocieties: any[] = [];

  // Pagination
  currentPage: number = 1;
  totalPages: number = 0;
    constructor(private socialSocietiesService: SocialSocietiesService, private router: Router) {}

    ngOnInit(): void {
      this.loadSocialSocieties();
    }


    loadSocialSocieties(): void {
      this.loading = true;
      this.socialSocietiesService.getAllSocialSocieties().subscribe({
        next: (res: any) => {
          // handle API response with { data: [...] }
          this.filteredSocialSocieties = Array.isArray(res?.data) ? res.data : [];
          this.totalPages = Math.ceil(this.filteredSocialSocieties.length / this.pageSize);
          this.paginate();
          this.loading = false;
        },
        error: () => {
          this.filteredSocialSocieties = [];
          this.paginatedSocialSocieties = [];
          this.totalPages = 0;
          this.loading = false;
        }
      });
    }

    paginate(): void {
      const start = (this.currentPage - 1) * this.pageSize;
      const end = start + this.pageSize;
      this.paginatedSocialSocieties = this.filteredSocialSocieties.slice(start, end);
    }
  getPaginationInfo() { return `${this.currentPage} / ${this.totalPages}`; }
  getPageSizeLabel() { return `${this.pageSize}`; }
  goToFirstPage() { this.currentPage = 1; this.paginate(); }
  goToPreviousPage() { if (this.currentPage > 1) { this.currentPage--; this.paginate(); } }
  goToNextPage() { if (this.currentPage < this.totalPages) { this.currentPage++; this.paginate(); } }
  goToLastPage() { this.currentPage = this.totalPages; this.paginate(); }
  goToPage(page: number) { this.currentPage = page; this.paginate(); }
  getPageNumbers() { return Array(this.totalPages).fill(0).map((_, i) => i + 1); }

  // Misc
  loading = false;
  isMobile = false;

  // Card helpers
  cover(society: any) {
    return society.photoUrl ? 'https://shusha.minya.gov.eg:93' + society.photoUrl : 'https://via.placeholder.com/150';
  }
  onImageError(event: any, society: any) { event.target.src = 'https://via.placeholder.com/150'; }
  title(society: any) {
    return this.lang.current === 'ar' ? (society.nameAr || 'بدون اسم') : (society.nameEn || 'No Name');
  }
  openDetails(id: any) {
    this.router.navigate(['/socialsocieties/details'], { state: { id } });
  }
}
