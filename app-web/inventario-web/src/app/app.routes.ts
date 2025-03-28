import { Routes } from '@angular/router';
import { MainPageComponent } from './Pages/main-page/main-page.component';
import { ProductosPageComponent } from './Pages/productos-page/productos-page.component';
import { TransaccionesPageComponent } from './Pages/transacciones-page/transacciones-page.component';
import { EstadosPageComponent } from './Pages/estados-page/estados-page.component';
import { CategoriaPageComponent } from './Pages/categoria-page/categoria-page.component';

export const routes: Routes = [
  { path: '', redirectTo: 'main', pathMatch: 'full' },
  { path: '****', redirectTo: 'main' },
  { path: 'main', component: MainPageComponent },
  { path: 'productos', component: ProductosPageComponent },
  { path: 'transacciones', component: TransaccionesPageComponent },
  { path: 'estados', component: EstadosPageComponent },
  { path: 'categorias', component: CategoriaPageComponent },
];
