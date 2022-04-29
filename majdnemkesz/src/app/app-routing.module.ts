import {Injectable, NgModule} from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./register/register.component";
import {ErrorPageComponent} from "./error-page/error-page.component";
import {FirstComponent} from "./first/first.component";
import {AuthGuard} from "./guards/auth.guard";
import {ProductsComponent} from "./products/products.component";
import {MoredetailComponent} from "./moredetail/moredetail.component";
import {ShopComponent} from "./shop/shop.component";

const routes: Routes = [
  { path: '', redirectTo:'index', pathMatch:'full'},
  { path: 'index', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'first', component: FirstComponent, canActivate: [AuthGuard]},
  { path: 'register', component: RegisterComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'shop/:id/:name/:price', component: ShopComponent },
  { path: 'product/:id', component: MoredetailComponent },

  { path: '**', pathMatch: 'full',
    component: ErrorPageComponent },

];
@Injectable({providedIn: "root"})

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
