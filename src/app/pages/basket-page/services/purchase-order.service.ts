import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from 'src/app/models/order.model';
import { PurchaseOrderClient } from '../clients/purchase-order.client';

@Injectable()
export class PurchaseOrderService {
  public constructor(
    private readonly purchaseOrderClient: PurchaseOrderClient
  ) {}

  public makeAnOrder(order: Order): Observable<{ message: string }> {
    return this.purchaseOrderClient.makeAnOrder(order);
  }
}
