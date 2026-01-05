// src/app/services/tourism.service.ts
import { Injectable } from '@angular/core';
import { TourismPlace } from '../../Models/tourism-place';

@Injectable({
  providedIn: 'root'
})
export class TourismService {
  
  // البيانات الأصلية للمعالم السياحية كما هي
  private tourismPlaces: TourismPlace[] = [
    {
      id: 1,
      title: 'مقابر بني حسن',
      description: 'مجموعة من المقابر المنحوتة في الصخر تعود لعصر الدولة الوسطى وتضم مشاهد للحياة اليومية والزراعة والصيد.',
      category: 'آثار',
      imageUrl: 'https://images.unsplash.com/photo-1632377468433-9b5c61a28d50?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      rating: 4.8,
      location: 'شرق النيل، جنوب المنيا',
      historicalPeriod: 'عصر الدولة الوسطى (2040-1782 ق.م)',
      visitingHours: '9:00 ص - 5:00 م',
      entryFee: 'جنيه مصري 100 للاجانب، 20 للمصريين',
      features: ['مناظر طبيعية خلابة', 'نقوش أثرية نادرة', 'مكان تصوير ممتاز']
    },
    {
      id: 2,
      title: 'تل العمارنة',
      description: 'عاصمة مصر القديمة في عهد الفرعون إخناتون، وتضم بقايا معابد وقصور ونقوش تعود للعصر الآتوني.',
      category: 'آثار',
      imageUrl: 'https://images.unsplash.com/photo-1572250616413-9a3f6c2adabc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      rating: 4.6,
      location: 'شرق النيل، 50 كم جنوب المنيا',
      historicalPeriod: 'عصر الأسرة الثامنة عشرة (حوالي 1346 ق.م)',
      visitingHours: '8:00 ص - 4:00 م',
      entryFee: '80 للاجانب، 10 للمصريين',
      features: ['تاريخ فريد', 'موقع أثري هام', 'إطلالة على النيل']
    },
    {
      id: 3,
      title: 'دير السيدة العذراء',
      description: 'واحد من أقدم الأديرة في مصر، يقع في منطقة جبلية ويضم كنيسة أثرية ومخطوطات نادرة.',
      category: 'دينية',
      imageUrl: 'https://images.unsplash.com/photo-1588423771073-b8903fbb85b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      rating: 4.7,
      location: 'جبل الطير، شرق سمالوط',
      historicalPeriod: 'القرن الرابع الميلادي',
      visitingHours: '8:00 ص - 5:00 م',
      entryFee: 'مجاني',
      features: ['مكان للعبادة والتأمل', 'عمارة قبطية فريدة', 'منظر بانورامي']
    },
    {
      id: 4,
      title: 'متحف المنيا',
      description: 'يضم المتحف مجموعة كبيرة من القطع الأثرية التي تعرض تاريخ محافظة المنيا من عصور ما قبل التاريخ حتى العصر الحديث.',
      category: 'متاحف',
      imageUrl: 'https://images.unsplash.com/photo-1572852410857-8e2a2ab5f4b9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      rating: 4.5,
      location: 'كورنيش النيل، مدينة المنيا',
      historicalPeriod: 'متحف حديث',
      visitingHours: '9:00 ص - 4:00 م',
      entryFee: '60 للاجانب، 10 للمصريين',
      features: ['قطع أثرية نادرة', 'عروض تفاعلية', 'مكتبة متخصصة']
    },
    {
      id: 5,
      title: 'حديقة الأندلس',
      description: 'منتزه كبير على ضفاف النيل يحتوي على مساحات خضراء ونوافير ومقاهي ومنطقة ألعاب للأطفال.',
      category: 'ترفيهية',
      imageUrl: 'https://images.unsplash.com/photo-1519677100203-5f5a1c56b565?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      rating: 4.3,
      location: 'كورنيش النيل، المنيا',
      visitingHours: '8:00 ص - 11:00 م',
      entryFee: 'رسوم رمزية',
      features: ['إطلالة على النيل', 'مساحات خضراء', 'منطقة ألعاب أطفال']
    }
  ];

  // تصنيفات الكروت الستة الموجودة في الصورة مع أيقوناتها
  private serviceCategories = [
    { id: 'hotels', name: 'فنادق', iconUrl: 'assets/icons/hotel.png' },
    { id: 'restaurants', name: 'مطاعم', iconUrl: 'assets/icons/restaurant.png' },
    { id: 'markets', name: 'الأسواق المجمعة', iconUrl: 'assets/icons/market.png' },
    { id: 'banks', name: 'البنوك', iconUrl: 'assets/icons/bank.png' },
    { id: 'airlines', name: 'شركات الطيران', iconUrl: 'assets/icons/plane.png' },
    { id: 'embassies', name: 'السفارات والقنصليات', iconUrl: 'assets/icons/embassy.png' }
  ];

  getTourismPlaces(): TourismPlace[] {
    return this.tourismPlaces;
  }

  // دالة لجلب كروت الخدمات الستة
  getServiceCategories() {
    return this.serviceCategories;
  }

  getTourismPlaceById(id: number): TourismPlace | undefined {
    return this.tourismPlaces.find(place => place.id === id);
  }

  // دالة الفلترة (تعمل الآن بذكاء: إذا لم تجد تصنيفاً طابقاً في الأماكن، ترجع مصفوفة فارغة أو الكل)
  filterByCategory(category: string): TourismPlace[] {
    if (category === 'all') {
      return this.tourismPlaces;
    }
    
    // ملاحظة: بما أن الكروت الستة (فنادق، بنوك...) قد لا تحتوي على بيانات حالياً في مصفوفة tourismPlaces، 
    // سنقوم بفلترة الأماكن بناءً على النوع (category) الموجود في البيانات
    const filtered = this.tourismPlaces.filter(place => place.category === category);
    
    // إذا ضغط المستخدم على "فنادق" وهي ليست موجودة في الـ Data الأصلية، سنعيد قائمة فارغة مؤقتاً
    return filtered;
  }
}