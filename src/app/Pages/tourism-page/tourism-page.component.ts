import { Component, OnInit } from '@angular/core';

interface Attraction {
  id: number;
  nameEn: string;
  nameAr: string;
  descriptionEn: string;
  descriptionAr: string;
  image: string;
  category: string;
  period: string;
  distance: string;
}

interface TourPackage {
  id: number;
  titleEn: string;
  titleAr: string;
  descriptionEn: string;
  descriptionAr: string;
  duration: string;
  difficulty: string;
  price: number;
  season: string;
  highlights: string[];
}

import { CommonModule } from '@angular/common';
@Component({
  standalone: true,
  selector: 'app-tourism-formal',
  templateUrl: './tourism-formal.component.html',
  styleUrls: ['./tourism-formal.component.css'],
  imports: [CommonModule]
})
export class TourismFormalComponent implements OnInit {
  currentLanguage: string = 'en';
  attractions: Attraction[] = [];
  tourPackages: TourPackage[] = [];
  filteredAttractions: Attraction[] = [];
  selectedCategory: string = 'all';

  constructor() {}

  ngOnInit(): void {
    this.initializeAttractions();
    this.initializeTourPackages();
    this.filterAttractions();
  }

  initializeAttractions(): void {
    this.attractions = [
      {
        id: 1,
        nameEn: 'Beni Hassan',
        nameAr: 'بني حسن',
        descriptionEn: 'Ancient Egyptian cemetery with 39 rock-cut tombs of provincial governors from the Middle Kingdom. Features intricate painted scenes depicting daily life, agriculture, hunting, and warfare. The site also contains the Cave of Artemis temple constructed by Hatshepsut and Thutmose III.',
        descriptionAr: 'مقبرة مصرية قديمة تضم 39 مقبرة منحوتة في الصخر لحكام الأقاليم من الدولة الوسطى. تتميز بمشاهد مرسومة معقدة تصور الحياة اليومية والزراعة والصيد والحروب. يحتوي الموقع أيضًا على معبد كهف أرتميس الذي بناه حتشبسوت وتحتمس الثالث.',
        image: '/home/ubuntu/upload/search_images/8clZls4Jz6wD.jpg',
        category: 'archaeological',
        period: 'Middle Kingdom (2055-1650 BCE)',
        distance: '20 km south of Minya'
      },
      {
        id: 2,
        nameEn: 'Tell el-Amarna',
        nameAr: 'تل العمارنة',
        descriptionEn: 'The ruins of Akhetaten, the revolutionary capital city built by Pharaoh Akhenaten during the New Kingdom. This site showcases unique Amarna Period architecture and represents a significant shift in Egyptian religious and artistic traditions.',
        descriptionAr: 'أطلال أخيتاتون، عاصمة الفرعون أخناتون الثورية التي بنيت خلال الدولة الحديثة. يعرض الموقع العمارة الفريدة لفترة العمارنة ويمثل تحولاً كبيراً في التقاليد الدينية والفنية المصرية.',
        image: '/home/ubuntu/upload/search_images/q8eCdYkRWsSm.jpg',
        category: 'archaeological',
        period: 'New Kingdom (1353-1336 BCE)',
        distance: '45 km south of Minya'
      },
      {
        id: 3,
        nameEn: 'Tuna el-Gebel',
        nameAr: 'تونة الجبل',
        descriptionEn: 'The largest Greco-Roman necropolis in Egypt, spanning from the New Kingdom to the Roman Period. Features extensive catacombs, animal mummies, statues, and the famous tomb of Petosiris with its remarkable artistic decorations.',
        descriptionAr: 'أكبر مقبرة يونانية رومانية في مصر، تمتد من الدولة الحديثة إلى الفترة الرومانية. تتميز بأنفاق واسعة ومومياوات حيوانية وتماثيل وقبر بتوسيريس الشهير بزخارفه الفنية الرائعة.',
        image: '/home/ubuntu/upload/search_images/003ptYpFbogr.jpg',
        category: 'archaeological',
        period: 'Greco-Roman Period',
        distance: '30 km north of Minya'
      },
      {
        id: 4,
        nameEn: 'Hermopolis',
        nameAr: 'الأشمونين',
        descriptionEn: 'The ancient city of Khmun, dedicated to the god Thoth (god of wisdom and knowledge). The site contains temple ruins, statues, and other structures that reveal the spiritual and cultural significance of this ancient center.',
        descriptionAr: 'مدينة خمون القديمة، المكرسة لإله توت (إله الحكمة والمعرفة). يحتوي الموقع على أطلال معابد وتماثيل وهياكل أخرى تكشف الأهمية الروحية والثقافية لهذا المركز القديم.',
        image: '/home/ubuntu/upload/search_images/VYSTZ8dFqrt9.jpg',
        category: 'archaeological',
        period: 'Multiple Eras',
        distance: '35 km north of Minya'
      },
      {
        id: 5,
        nameEn: 'Fraser Tombs',
        nameAr: 'مقابر فريزر',
        descriptionEn: 'Ancient rock-cut tombs from the Old Kingdom (Fourth and Fifth Dynasties) forming a 3 km long necropolis. The tombs contain statues, hieroglyphics, and reveal information about the daily life and burial practices of ancient Egyptian nobility.',
        descriptionAr: 'مقابر منحوتة في الصخر من الدولة القديمة (الأسرتان الرابعة والخامسة) تشكل مقبرة بطول 3 كم. تحتوي المقابر على تماثيل وكتابات هيروغليفية وتكشف معلومات عن الحياة اليومية وممارسات الدفن للنبلاء المصريين القدماء.',
        image: '/home/ubuntu/upload/search_images/HvnUjfea6YWN.jpg',
        category: 'archaeological',
        period: 'Old Kingdom (2686-2181 BCE)',
        distance: '8 km northeast of Minya'
      },
      {
        id: 6,
        nameEn: 'Mallawi Museum',
        nameAr: 'متحف ملوي',
        descriptionEn: 'Established in 1963, this museum houses a significant collection of artifacts from Tuna el-Gebel and Hermopolis, including animal mummies, statues of the god Thoth, and other precious archaeological finds.',
        descriptionAr: 'تأسس عام 1963، يضم هذا المتحف مجموعة كبيرة من الآثار من تونة الجبل والأشمونين، بما في ذلك مومياوات الحيوانات وتماثيل إله توت والعديد من الاكتشافات الأثرية الثمينة الأخرى.',
        image: 'https://i.imgur.com/6g3YyFz.jpeg',
        category: 'museum',
        period: 'Established 1963',
        distance: 'In Mallawi City'
      }
    ];
  }

  initializeTourPackages(): void {
    this.tourPackages = [
      {
        id: 1,
        titleEn: 'Ancient Minya Discovery',
        titleAr: 'اكتشاف منيا القديمة',
        descriptionEn: 'Explore the most significant archaeological sites of Minya including Beni Hassan tombs, Tell el-Amarna, and Tuna el-Gebel with expert guidance and comprehensive historical insights.',
        descriptionAr: 'استكشف أهم المواقع الأثرية في منيا بما في ذلك مقابر بني حسن وتل العمارنة وتونة الجبل مع إرشادة خبير ورؤى تاريخية شاملة.',
        duration: '3 Days / 2 Nights',
        difficulty: 'Moderate',
        price: 150,
        season: 'October - April',
        highlights: ['Beni Hassan Tombs', 'Tell el-Amarna Ruins', 'Tuna el-Gebel Necropolis', 'Nile River Views', 'Expert Guidance']
      },
      {
        id: 2,
        titleEn: 'Nile River Experience',
        titleAr: 'تجربة نهر النيل',
        descriptionEn: 'A relaxing day cruise along the Nile with traditional felucca sailing, riverside dining, and breathtaking sunset views of the Egyptian landscape.',
        descriptionAr: 'رحلة نهارية مريحة على طول نهر النيل مع الإبحار التقليدي والطعام على الضفة ومناظر الغروب الخلابة.',
        duration: '1 Day',
        difficulty: 'Easy',
        price: 75,
        season: 'Year Round',
        highlights: ['Felucca Sailing', 'Scenic Nile Views', 'Traditional Lunch', 'Sunset Cruise', 'Photography Opportunities']
      },
      {
        id: 3,
        titleEn: 'Cultural Heritage Tour',
        titleAr: 'جولة التراث الثقافي',
        descriptionEn: 'Comprehensive exploration of Minya\'s cultural heritage including museums, traditional crafts, local markets, and authentic interactions with local communities.',
        descriptionAr: 'استكشاف شامل للتراث الثقافي لمنيا بما في ذلك المتاحف والحرف التقليدية والأسواق المحلية والتفاعل الأصيل مع المجتمعات المحلية.',
        duration: '5 Days / 4 Nights',
        difficulty: 'Easy',
        price: 300,
        season: 'November - March',
        highlights: ['Museum Visits', 'Traditional Crafts', 'Local Markets', 'Cultural Experiences', 'Community Interactions']
      }
    ];
  }

  filterAttractions(): void {
    if (this.selectedCategory === 'all') {
      this.filteredAttractions = this.attractions;
    } else {
      this.filteredAttractions = this.attractions.filter(
        attr => attr.category === this.selectedCategory
      );
    }
  }

  switchLanguage(lang: string): void {
    this.currentLanguage = lang;
  }

  getAttractionName(attraction: Attraction): string {
    return this.currentLanguage === 'en' ? attraction.nameEn : attraction.nameAr;
  }

  getAttractionDescription(attraction: Attraction): string {
    return this.currentLanguage === 'en' ? attraction.descriptionEn : attraction.descriptionAr;
  }

  getTourTitle(tour: TourPackage): string {
    return this.currentLanguage === 'en' ? tour.titleEn : tour.titleAr;
  }

  getTourDescription(tour: TourPackage): string {
    return this.currentLanguage === 'en' ? tour.descriptionEn : tour.descriptionAr;
  }

  onCategoryChange(category: string): void {
    this.selectedCategory = category;
    this.filterAttractions();
  }

  scrollToSection(sectionId: string): void {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
}