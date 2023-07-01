import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { BasketItem } from 'src/app/models/basket-item.model';
import { OrderItem } from 'src/app/models/order-item.model';
import { Order } from 'src/app/models/order.model';
import { BasketService } from 'src/app/services/basket.service';
import { PurchaseOrderService } from './services/purchase-order.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-basket-page',
  templateUrl: './basket-page.component.html',
  styleUrls: ['./basket-page.component.scss'],
})
export class BasketPageComponent implements OnInit, OnDestroy {
  public basket: BasketItem[] = [];
  public clientFullName = '';

  private readonly destroy$ = new Subject<void>();

  public constructor(
    private readonly basketService: BasketService,
    private readonly purchaseOrderService: PurchaseOrderService,
    private readonly router: Router
  ) {}

  public ngOnInit(): void {
    this.getBasketObservable();
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public get totals(): number {
    return this.basket.reduce(
      (currentPrice, item) => currentPrice + this.getTTC(item),
      0
    );
  }

  public getHT(item: BasketItem): number {
    return Math.trunc(item.quantity * item.article.price * 100) / 100;
  }

  public getTTC(item: BasketItem): number {
    const ratePrice = this.getRatePrice(item);
    const htPrice = this.getHT(item);
    return Math.trunc((htPrice + ratePrice) * 100) / 100;
  }

  public getRate(item: BasketItem): number {
    return item.article.canTakeaway && item.isTakeaway ? 5.5 / 100 : 20 / 100;
  }

  public getRatePrice(item: BasketItem): number {
    return (
      Math.trunc(
        this.getRate(item) * item.quantity * item.article.price * 100
      ) / 100
    );
  }

  public validateOrder(): void {
    if (!this.clientFullName) {
      alert('Veuillez entrer un nom valide'); // A remplacer par une modale
      return;
    }

    const order = this.createOrder();

    this.purchaseOrderService.makeAnOrder(order).subscribe((result) => {
      this.basketService.clearBasket();
      alert(result.message);
      this.router.navigateByUrl('/');
    });
  }

  private createOrder(): Order {
    return {
      clientFullName: this.clientFullName,
      orderItems: this.basket.map<OrderItem>((item) => {
        return {
          quantity: item.quantity,
          articleReference: item.article.reference,
          isTakeaway: item.isTakeaway,
        };
      }),
    };
  }

  private getBasketObservable(): void {
    this.basketService
      .getBasket()
      .pipe(takeUntil(this.destroy$))
      .subscribe((basket) => {
        this.basket = basket;
      });
  }
}
