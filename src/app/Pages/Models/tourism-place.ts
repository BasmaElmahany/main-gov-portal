// src/app/models/tourism-place.ts
export interface TourismPlace {
  id: number;
  title: string;
  description: string;
  category: string;
  imageUrl: string;
  rating: number;
  location: string;
  historicalPeriod?: string;
  visitingHours?: string;
  entryFee?: string;
  features?: string[];
}