import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BasketPageComponent } from './basket-page/basket-page.component';
import { PurchaseOrderClient } from './basket-page/clients/purchase-order.client';
import { PurchaseOrderService } from './basket-page/services/purchase-order.service';
import { ArticlesClient } from './home-page/clients/articles.client';
import { ArticleComponent } from './home-page/components/article/article.component';
import { HomePageComponent } from './home-page/home-page.component';
import { ArticlesService } from './home-page/services/articles.service';

@NgModule({
  imports: [CommonModule, RouterModule, FormsModule],
  declarations: [HomePageComponent, ArticleComponent, BasketPageComponent],
  providers: [
    ArticlesClient,
    ArticlesService,
    PurchaseOrderClient,
    PurchaseOrderService,
  ],
})
export class PagesModule {}
