import { Pipe, PipeTransform } from '@angular/core';
import { LanguageService } from '../Services/language.service';


@Pipe({ name: 't', standalone: true, pure: false })
export class TranslatePipe implements PipeTransform {
  constructor(private lang: LanguageService) {}
  transform(key: string): string {
    return this.lang.t(key);
  }
}
