import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { TranslatePipe } from '../../Pipes/translate.pipe';
import { LanguageService } from '../../Services/language.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterLink, TranslatePipe, MatIconModule],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'] // ✅ FIX
})
export class FooterComponent {


    constructor(private lang: LanguageService) {}
  get langDir() { return this.lang.dir; }
}
