export interface CultureCenter {
	id: string;
	nameAr: string;
	nameEn: string;
	dirNameAr?: string;
	dirNameEn?: string;
	addressAr?: string;
	addressEn?: string;
	phoneNumber1?: string;
	phoneNumber2?: string;
	email?: string;
	faxNumber?: string;
	link?: string;
	photoUrl?: string;
	dirPhotoUrl?: string;
	activities?: any[];
	services?: any[];
}

export interface CultureCenterRead {
	id: string;
	nameAr: string;
	nameEn: string;
	photoUrl?: string;
	dirPhotoUrl?: string;
	dirNameAr?: string;
	dirNameEn?: string;
	addressAr?: string;
	addressEn?: string;
	phoneNumber1?: string;
	phoneNumber2?: string;
	email?: string;
	faxNumber?: string;
	link?: string;
	activities?: any[];
	services?: any[];
}
