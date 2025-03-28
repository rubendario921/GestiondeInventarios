import { Component } from '@angular/core';
import { HeaderMainPageComponent } from '../main-page/templates/header-main-page/header-main-page.component';
import { FooterMainPageComponent } from '../main-page/templates/footer-main-page/footer-main-page.component';
import { ViewCategoriaComponent } from './view-categoria/view-categoria.component';

@Component({
  selector: 'app-categoria-page',
  imports: [
    HeaderMainPageComponent,
    FooterMainPageComponent,
    ViewCategoriaComponent,
  ],
  templateUrl: './categoria-page.component.html',
  styleUrl: './categoria-page.component.scss',
})
export class CategoriaPageComponent {}
