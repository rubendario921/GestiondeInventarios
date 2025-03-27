import { Component } from '@angular/core';
import { FooterMainPageComponent } from './templates/footer-main-page/footer-main-page.component';
import { HeaderMainPageComponent } from './templates/header-main-page/header-main-page.component';

@Component({
  selector: 'app-main-page',
  imports: [FooterMainPageComponent, HeaderMainPageComponent],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss',
})
export class MainPageComponent {}
