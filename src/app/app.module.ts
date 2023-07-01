import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutModule } from './layouts/layout.module';
import { PagesModule } from './pages/pages.module';
import { BasketService } from './services/basket.service';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    LayoutModule,
    PagesModule,
  ],
  providers: [BasketService],
  bootstrap: [AppComponent],
})
export class AppModule {}
