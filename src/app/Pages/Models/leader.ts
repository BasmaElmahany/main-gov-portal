export interface Leader {
  id: string;
  nameAr: string;
  nameEn: string;
  cvDataAr: string;
  cvDataEn: string;
  positionAr: string;
  positionEn: string;
  startDate: string;
  endDate: string;
  photoUrl?: string;
  isEnded: boolean;
}

export interface LocalizedText {
  ar: string;
  en: string;
}

export interface MonthItem {
  img: string;
  date: string; // ISO
  title: LocalizedText;
}