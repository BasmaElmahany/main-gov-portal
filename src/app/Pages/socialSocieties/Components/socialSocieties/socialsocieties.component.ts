import { Component } from '@angular/core';
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
    MatCardModule
  ],
  templateUrl: './socialsocieties.component.html',
  styleUrls: ['./socialsocieties.component.scss']
})
export class SocialSocietiesComponent {
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

  // Dummy data for societies
  filteredSocialSocieties: any[] = Array(25).fill({ id: 1, name: 'جمعية اجتماعية', image: '', title: 'جمعية اجتماعية' });
  paginatedSocialSocieties: any[] = this.filteredSocialSocieties.slice(0, this.pageSize);

  // Pagination
  currentPage: number = 1;
  totalPages: number = Math.ceil(this.filteredSocialSocieties.length / this.pageSize);
  getPaginationInfo() { return `${this.currentPage} / ${this.totalPages}`; }
  getPageSizeLabel() { return `${this.pageSize}`; }
  goToFirstPage() { this.currentPage = 1; }
  goToPreviousPage() { if (this.currentPage > 1) this.currentPage--; }
  goToNextPage() { if (this.currentPage < this.totalPages) this.currentPage++; }
  goToLastPage() { this.currentPage = this.totalPages; }
  goToPage(page: number) { this.currentPage = page; }
  getPageNumbers() { return Array(this.totalPages).fill(0).map((_, i) => i + 1); }

  // Misc
  loading = false;
  isMobile = false;

  // Card helpers
  cover(society: any) { return society.image || 'https://via.placeholder.com/150'; }
  onImageError(event: any, society: any) { event.target.src = 'https://via.placeholder.com/150'; }
  title(society: any) { return society.title || society.name; }
  openDetails(id: any) { /* navigate to details */ }
}
