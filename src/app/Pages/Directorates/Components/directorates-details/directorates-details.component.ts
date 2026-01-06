import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ActivatedRoute, Router } from '@angular/router';
import { LanguageService } from '../../../../Shared/Services/language.service';
import { DirectoratesService } from '../../../Services/directorates/directorates.service';
import { Directorate } from '../../../Models/directorates';

@Component({
  selector: 'app-directorates-details',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatProgressSpinnerModule],
  templateUrl: './directorates-details.component.html',
  styleUrls: ['./directorates-details.component.scss']
})
export class DirectoratesDetailsComponent implements OnInit {
  id!: string;
  loading = true;
  directorate?: Directorate;

  constructor(
    private route: ActivatedRoute,
    private service: DirectoratesService,
    public lang: LanguageService,
    private router: Router
  ) {
    // نفس اللوجيك بتاعك: استلام الـ ID من الـ State
    const state = history.state as { id?: string };

    if (!state?.id) {
      this.router.navigate(['/directorates']);
      return;
    }

    this.id = state.id;
  }

  ngOnInit(): void {
    // ملاحظة: اتأكد إن اسم الفانكشن في السيرفس getbyId أو getById
    this.service.getbyId(this.id).subscribe({
      next: (res: any) => {
        // لو الـ API بيرجع الكائن جوه data زي الـ tours استخدم res.data
        // لو بيرجعه مباشرة استخدم res
        this.directorate = res.data ? res.data : res;
        this.loading = false;
        console.log('Directorate Detail:', this.directorate);
      },
      error: () => this.loading = false
    });
  }

  // استخدام الحقول nameAr و nameEn اللي موجودة في الـ Console
  title(): string {
    if (!this.directorate) return '';
    return this.lang.current === 'ar'
      ? this.directorate.nameAr || this.directorate.titleAr || ''
      : this.directorate.nameEn || this.directorate.titleEn || '';
  }

  // الوصف (article)
  description(): string {
    if (!this.directorate) return '';
    return this.lang.current === 'ar'
      ? this.directorate.descriptionAr || this.directorate.addressAr || ''
      : this.directorate.descriptionEn || this.directorate.addressEn || '';
  }

  // نفس لوجيك الـ ImageUrl
  imageUrl(path: string): string {
    return path ? `https://shusha.minya.gov.eg:93${path}` : 'assets/placeholder.jpg';
  }
}