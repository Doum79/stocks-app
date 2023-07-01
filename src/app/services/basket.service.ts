import { Injectable } from '@angular/core';
import { BasketItem } from '../models/basket-item.model';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class BasketService {
  private readonly basket$ = new BehaviorSubject<BasketItem[]>([]);

  public constructor() {}

  public getBasket(): Observable<BasketItem[]> {
    return this.basket$.asObservable();
  }
  public addItem(basketItem: BasketItem): void {
    if(basketItem.quantity <= 0) {
      return;
    }

    const baskets = this.basket$.value;
    const itemIndex = baskets.findIndex(
      (item) => item.article.reference === basketItem.article.reference
    );

    if (itemIndex < 0) {
      baskets.push(basketItem);
    } else {
      baskets[itemIndex].quantity += basketItem.quantity;
      baskets[itemIndex].isTakeaway = basketItem.isTakeaway;
    }

    this.basket$.next(baskets);
  }

  public clearBasket(): void {
    this.basket$.next([]);
  }
}

