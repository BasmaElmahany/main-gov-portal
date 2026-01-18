import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DOCUMENT } from '@angular/common';
import { BehaviorSubject, firstValueFrom } from 'rxjs';

export type Lang = 'en' | 'ar';

@Injectable({ providedIn: 'root' })
export class LanguageService {
  private readonly storageKey = 'gov-portal-lang';
  private dict: Record<string, string> = {};

  readonly lang$ = new BehaviorSubject<Lang>((localStorage.getItem(this.storageKey) as Lang) || 'ar');

  constructor(
    private http: HttpClient,
    @Inject(DOCUMENT) private doc: Document
  ) {
    this.applyDocumentAttrs(this.lang$.value);
    void this.load(this.lang$.value);
  }

  get current(): Lang {
    return this.lang$.value;
  }

  get dir(): 'rtl' | 'ltr' {
    return this.current === 'ar' ? 'rtl' : 'ltr';
  }

  async setLanguage(lang: Lang) {
    if (lang === this.current) return;
    localStorage.setItem(this.storageKey, lang);
    this.lang$.next(lang);
    this.applyDocumentAttrs(lang);
    await this.load(lang);
  }

  toggle() {
    void this.setLanguage(this.current === 'ar' ? 'en' : 'ar');
  }

  t(key: string): string {
    return this.dict[key] ?? key;
  }

  private async load(lang: Lang) {
    const data = await firstValueFrom(
      this.http.get<Record<string, string>>(`/assets/i18n/${lang}.json`)
    );
    this.dict = data || {};
  }

  private applyDocumentAttrs(lang: Lang) {
    this.doc.documentElement.lang = lang;
    this.doc.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  }
}
