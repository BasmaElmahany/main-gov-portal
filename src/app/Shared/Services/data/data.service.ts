import { Injectable } from '@angular/core';
import { of, delay } from 'rxjs';

export type Localized = { en: string; ar: string };

export interface Leader {
  name: Localized;
  title: Localized;
  photoUrl?: string;
}

export interface Entity {
  name: Localized;
  category: 'directorate' | 'local-unit' | 'authority' | 'company' | 'other';
  phone?: string;
}

export interface NewsItem {
  title: Localized;
  summary: Localized;
  dateISO: string;
  tag: 'announcement' | 'news' | 'document';
}

export interface ServiceItem {
  title: Localized;
  category: 'health' | 'education' | 'social' | 'investment' | 'utilities' | 'other';
  channel: 'online' | 'office' | 'hotline';
}

export interface StatItem {
  label: Localized;
  value: string;
}

@Injectable({ providedIn: 'root' })
export class DataService {
  leaders: Leader[] = [
    { name: { ar: 'اللواء / محافظ المحافظة', en: 'Governor' }, title: { ar: 'محافظ', en: 'Governor' } },
    { name: { ar: 'د. وكيل الوزارة', en: 'Undersecretary' }, title: { ar: 'قيادة تنفيذية', en: 'Executive Official' } },
  ];

  entities: Entity[] = [
    { name: { ar: 'مديرية الصحة', en: 'Health Directorate' }, category: 'directorate', phone: '123' },
    { name: { ar: 'مديرية التربية والتعليم', en: 'Education Directorate' }, category: 'directorate', phone: '124' },
    { name: { ar: 'الوحدة المحلية', en: 'Local Unit' }, category: 'local-unit' },
  ];

  news: NewsItem[] = [
    {
      title: { ar: 'إعلان هام للمواطنين', en: 'Important Citizen Announcement' },
      summary: { ar: 'تنبيه بشأن الخدمات الإلكترونية خلال عطلة رسمية.', en: 'Notice about online services during a public holiday.' },
      dateISO: new Date().toISOString(),
      tag: 'announcement'
    },
    {
      title: { ar: 'افتتاح مشروع خدمي جديد', en: 'New Public Service Project افتتاح' },
      summary: { ar: 'تعزيز البنية التحتية وتحسين جودة الخدمات.', en: 'Infrastructure improvement to enhance service quality.' },
      dateISO: new Date(Date.now() - 86400000 * 3).toISOString(),
      tag: 'news'
    },
  ];

  services: ServiceItem[] = [
    { title: { ar: 'استخراج شهادة ميلاد', en: 'Birth Certificate Issuance' }, category: 'other', channel: 'office' },
    { title: { ar: 'حجز موعد مستشفى', en: 'Hospital Appointment Booking' }, category: 'health', channel: 'online' },
    { title: { ar: 'الاستعلام عن المدارس', en: 'School Lookup' }, category: 'education', channel: 'online' },
    { title: { ar: 'الدعم الاجتماعي', en: 'Social Support Programs' }, category: 'social', channel: 'office' },
  ];

  stats: StatItem[] = [
    { label: { ar: 'الخدمات الرقمية', en: 'Digital Services' }, value: '48+' },
    { label: { ar: 'جهات حكومية', en: 'Government Entities' }, value: '120+' },
    { label: { ar: 'إعلانات نشطة', en: 'Active Announcements' }, value: '9' },
  ];

  submitContact(payload: { name: string; email: string; message: string }) {
    return of({ ok: true }).pipe(delay(700));
  }
}
