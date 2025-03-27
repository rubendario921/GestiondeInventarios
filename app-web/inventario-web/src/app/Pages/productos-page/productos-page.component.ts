import { Component } from '@angular/core';
import { HeaderMainPageComponent } from '../main-page/templates/header-main-page/header-main-page.component';
import { FooterMainPageComponent } from '../main-page/templates/footer-main-page/footer-main-page.component';
import { ViewProductoComponent } from './view-producto/view-producto.component';
import { NewProductoComponent } from './new-producto/new-producto.component';

@Component({
  selector: 'app-productos-page',
  imports: [
    HeaderMainPageComponent,
    FooterMainPageComponent,
    ViewProductoComponent,
    NewProductoComponent,
  ],
  templateUrl: './productos-page.component.html',
  styleUrl: './productos-page.component.scss',
})
export class ProductosPageComponent {}
