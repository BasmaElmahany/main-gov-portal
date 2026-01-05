export interface Company {
  id: string;
  nameAr: string;
  nameEn: string;
  photoUrl: string;
  dirPhotoUrl?: string | null;
  dirNameAr?: string | null;
  dirNameEn?: string | null;
  addressAr?: string | null;
  addressEn?: string | null;
  phoneNumber1?: string | null;
  phoneNumber2?: string | null;
  email?: string | null;
  faxNumber?: string | null;
  link?: string | null;
  activities: any[];
  services: any[];
}