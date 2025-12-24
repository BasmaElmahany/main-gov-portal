import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },

  { path: 'home', loadComponent: () => import('./Pages/home/home.component').then(m => m.HomeComponent) },
  { path: 'leaders', loadComponent: () => import('./Pages/leaders/leaders.component').then(m => m.LeadersComponent) },
  { path: 'govtours', loadComponent: () => import('./Pages/gov-tours/gov-tours.component').then(m => m.GovToursComponent) },
  { path: 'gov-tours/:id', loadComponent: () => import('./Pages/gov-tour-details/gov-tour-details.component').then(m => m.GovTourDetailsComponent) },

  //{ path: 'tourism', loadComponent: () => import('./pages/tourism/tourism.component').then(m => m.TourismComponent) },
  //{ path: 'investment', loadComponent: () => import('./pages/investment/investment.component').then(m => m.InvestmentComponent) },
  //{ path: 'services', loadComponent: () => import('./pages/services/services.component').then(m => m.ServicesComponent) },
  //{ path: 'archive', loadComponent: () => import('./pages/archive/archive.component').then(m => m.ArchiveComponent) },
  //{ path: 'contact', loadComponent: () => import('./pages/contact/contact.component').then(m => m.ContactComponent) },
  //{ path: 'about', loadComponent: () => import('./pages/about/about.component').then(m => m.AboutComponent) },
  //{ path: 'health', loadComponent: () => import('./pages/health/health.component').then(m => m.HealthComponent) },
  //{ path: 'education', loadComponent: () => import('./pages/education/education.component').then(m => m.EducationComponent) },
  //{ path: 'social-services', loadComponent: () => import('./pages/social-services/social-services.component').then(m => m.SocialServicesComponent) },

  // 13th page (optional)
  //{ path: 'news', loadComponent: () => import('./pages/news/news.component').then(m => m.NewsComponent) },

  { path: '**', redirectTo: 'home' },
];
``