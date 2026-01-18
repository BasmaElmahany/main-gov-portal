import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { NewsTypes } from '../Models/news';
import { NewsTypesService } from '../Services/newsTypes/news-types.service';
import { LanguageService } from '../../Shared/Services/language.service';

@Component({
  selector: 'app-news-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule, MatIconModule],
  templateUrl: './news-sidebar.component.html',
  styleUrl: './news-sidebar.component.scss'
})
export class NewsSidebarComponent implements OnInit {

  types: NewsTypes[] = [];
  activeTypeId: number | null = null;
  loading = true;

  constructor(
    private typeService: NewsTypesService,
    private router: Router,
    private route: ActivatedRoute,
    public lang: LanguageService
  ) { }

  ngOnInit(): void {
    // Load types
    this.typeService.getAllNewsTypes().subscribe({
      next: data => {
        this.types = data;
        this.loading = false;
      },
      error: () => (this.loading = false)
    });

    // Track active type from URL
    this.route.queryParamMap.subscribe(params => {
      const id = params.get('typeId');
      this.activeTypeId = id ? Number(id) : null;
    });
  }

  getTypeName(type: NewsTypes): string {
    return this.lang.current === 'ar'
      ? type.nameAr
      : type.nameEn;
  }

  goToType(typeId: number): void {
    this.router.navigate(['/news'], {
      queryParams: { typeId }
    });
  }
}