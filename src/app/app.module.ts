import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { LogoComponent } from './logo/logo.component';
import { HomeComponent } from './home/home.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ShoppingCarComponent } from './shopping-car/shopping-car.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { ClientComponent } from './client/client.component';
import { NgxLoadingModule, ngxLoadingAnimationTypes  } from "ngx-loading";

@NgModule({
  declarations: [
    AppComponent,
    LogoComponent,
    HomeComponent,
    ProductDetailComponent,
    ShoppingCarComponent,
    NavBarComponent,
    ClientComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    SweetAlert2Module.forRoot(),
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireStorageModule,
    NgxLoadingModule.forRoot({
      animationType: ngxLoadingAnimationTypes.circle,
      primaryColour: '#ff0000',
      secondaryColour: '#000000',
      backdropBackgroundColour: 'rgba(0, 0, 0, 0.9)'
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
