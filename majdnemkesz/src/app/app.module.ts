import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { EnvironmentPipe } from './environments/environment.pipe';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FirstComponent } from './first/first.component';
import {AuthGuard} from "./guards/auth.guard";
import { ProductsComponent } from './products/products.component';
import { MoredetailComponent } from './moredetail/moredetail.component';
import { ShopComponent } from './shop/shop.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    LoginComponent,
    RegisterComponent,
    ErrorPageComponent,
    EnvironmentPipe,
    FirstComponent,
    ProductsComponent,
    MoredetailComponent,
    ShopComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,

  ],
  providers:[AuthGuard],

  bootstrap: [AppComponent]
})
export class AppModule { }
