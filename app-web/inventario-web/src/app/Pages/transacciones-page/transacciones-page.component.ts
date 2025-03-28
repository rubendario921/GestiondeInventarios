import { Component } from '@angular/core';
import { HeaderMainPageComponent } from '../main-page/templates/header-main-page/header-main-page.component';
import { FooterMainPageComponent } from '../main-page/templates/footer-main-page/footer-main-page.component';

@Component({
  selector: 'app-transacciones-page',
  imports: [HeaderMainPageComponent, FooterMainPageComponent],
  templateUrl: './transacciones-page.component.html',
  styleUrl: './transacciones-page.component.scss',
})
export class TransaccionesPageComponent {}
