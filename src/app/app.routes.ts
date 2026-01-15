import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },

  { path: 'home', loadComponent: () => import('./Pages/home/home.component').then(m => m.HomeComponent) },
  
  // Social Societies
  { 
    path: 'socialsocieties', 
    loadComponent: () => import('./Pages/socialSocieties/Components/socialSocieties/socialsocieties.component').then(m => m.SocialSocietiesComponent) 
  },
  {
    path: 'socialsocieties/details',
    loadComponent: () => import('./Pages/socialSocieties/Components/socialSocieties_details/socialsocieties-details.component').then(m => m.SocialSocietiesDetailsComponent)
  },

  { path: 'leaders', loadComponent: () => import('./Pages/leaders/leaders.component').then(m => m.LeadersComponent) },
  { path: 'govtours', loadComponent: () => import('./Pages/gov-tours/gov-tours.component').then(m => m.GovToursComponent) },
  {
    path: 'gov-tours/details',
    loadComponent: () => import('./Pages/gov-tour-details/gov-tour-details.component').then(m => m.GovTourDetailsComponent)
  },

  { path: 'news', loadComponent: () => import('./Pages/news/news.component').then(m => m.NewsComponent) },
  {
    path: 'news/details',
    loadComponent: () => import('./Pages/news-details/news-details.component').then(m => m.NewsDetailsComponent)
  },

  { path: 'directorates', loadComponent: () => import('./Pages/Directorates/Components/directorates/directorates.component').then(m => m.DirectoratesComponent) },
  {
    path: 'directorates/details',
    loadComponent: () => import('./Pages/Directorates/Components/directorates-details/directorates-details.component').then(m => m.DirectoratesDetailsComponent)
  },

  { path: 'tourism', loadComponent: () => import('./Pages/tourism-page/tourism-page.component').then(m => m.TourismFormalComponent) },

  { path: 'companies', loadComponent: () => import('./Pages/company/Components/companies/companies.component').then(m => m.CompaniesComponent) },
  {
    path: 'companies/details',
    loadComponent: () => import('./Pages/company/Components/companies-details/companies-details.component').then(m => m.CompaniesDetailsComponent)
  },

  { path: 'agencies', loadComponent: () => import('./Pages/Agencies/Components/Agencies/Agencies.component').then(m => m.AgenciesComponent) },
  {
    path: 'agencies/details',
    loadComponent: () => import('./Pages/Agencies/Components/Agencies-details/Agencies-details.component').then(m => m.AgenciesDetailsComponent)
  },

  { path: 'culturecenters', loadComponent: () => import('./Pages/CultureCenters/Components/culturecenters/culturecenters.component').then(m => m.CulturecentersComponent) },
  {
    path: 'culturecenters/details',
    loadComponent: () => import('./Pages/CultureCenters/Components/culturecenters-details/culturecenters-details.component').then(m => m.CultureCentersDetailsComponent)
  },

  // Wildcard route (يجب أن يكون دائماً في الآخر)
  { path: '**', redirectTo: 'home' },
];