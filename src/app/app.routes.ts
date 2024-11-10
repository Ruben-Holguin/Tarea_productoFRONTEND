import { Routes } from '@angular/router';
import { ProductoComponent } from './componentes/producto/producto.component';
import { CategoriaComponent } from './componentes/categoria/categoria.component';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        title: 'home'
    },
    {
        path: 'producto',
        component: ProductoComponent,
        title: 'Producto'
    },
    {
        path: 'categoria',
        component: CategoriaComponent,
        title: 'Categoria'
    },
    {
        path: '**',
        redirectTo: '',
        pathMatch: 'full'
    }
];
