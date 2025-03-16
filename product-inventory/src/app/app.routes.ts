import { Routes } from '@angular/router';
import { WelcomeComponent } from './pages/welcome/welcome.component';
import { AboutComponent } from './pages/about/about.component';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { RegisterComponent } from './pages/register/register.component';
import { ProductListComponent } from './pages/product-list/product-list.component';
import { ProductViewComponent } from './pages/product-detail/product-detail.component';
import { ProductEditComponent } from './pages/product-edit/product-edit.component';
import { ProductAddComponent } from './pages/product-add/product-add.component';
//import { AuthGuard } from './auth.guard';

export const routes: Routes = [
  { path: '', component: WelcomeComponent }, 
  //{ path: 'welcome', component: WelcomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'sign-in', component: SignInComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'products', component: ProductListComponent},
  { path: 'products/view/:id', component: ProductViewComponent },
  { path: 'products/edit/:id', component: ProductEditComponent },
  { path: 'products/add', component: ProductAddComponent },
  //{ path: '**', redirectTo: '/sign-in' } 
];
