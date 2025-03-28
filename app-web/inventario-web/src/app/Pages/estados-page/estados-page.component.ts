import { Component } from '@angular/core';
import { HeaderMainPageComponent } from '../main-page/templates/header-main-page/header-main-page.component';
import { FooterMainPageComponent } from '../main-page/templates/footer-main-page/footer-main-page.component';
import { NewEstadoComponent } from './new-estado/new-estado.component';
import { ViewEstadoComponent } from './view-estado/view-estado.component';

@Component({
  selector: 'app-estados-page',
  imports: [
    HeaderMainPageComponent,
    FooterMainPageComponent,
    NewEstadoComponent,
    ViewEstadoComponent,
  ],
  templateUrl: './estados-page.component.html',
  styleUrl: './estados-page.component.scss',
})
export class EstadosPageComponent {}
