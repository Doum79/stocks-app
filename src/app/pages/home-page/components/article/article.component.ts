import { Component, Input, OnInit } from '@angular/core';
import { Article } from 'src/app/models/article.model';
import { BasketItem } from 'src/app/models/basket-item.model';
import { BasketService } from 'src/app/services/basket.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
})
export class ArticleComponent implements OnInit {
  @Input()
  public article: Article = {} as Article;
  public basketItem: BasketItem = { quantity: 0 } as BasketItem;
  public showBasket = false;

  public constructor(private readonly basketService: BasketService) {}

  public ngOnInit(): void {}

  public increaseQuantity(): void {
    this.basketItem.quantity++;
  }

  public decreaseQuantity(): void {
    if (this.basketItem.quantity <= 0) {
      return;
    }

    this.basketItem.quantity--;
  }

  public showBasketWindow(): void {
    this.showBasket = true;
    this.basketItem.article = this.article;
  }

  public addArticleToBasket(): void {
    if (!this.basketItem.article) {
      return;
    }

    this.basketService.addItem({ ...this.basketItem });
    this.basketItem = this.createBasketItem();
    this.showBasket = false;
    alert('Ajouté au panier avec succès !');
  }

  private createBasketItem(): BasketItem {
    return {
      quantity: 0,
      article: this.article,
      isTakeaway: false,
    };
  }
}
