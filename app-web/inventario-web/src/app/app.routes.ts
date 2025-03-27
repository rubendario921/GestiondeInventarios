import { Routes } from '@angular/router';
import { MainPageComponent } from './Pages/main-page/main-page.component';

export const routes: Routes = [
    {path: '', redirectTo: 'main', pathMatch: 'full'},
    {path:'****',redirectTo:'main'},
    {path:'main',component:MainPageComponent}
];
