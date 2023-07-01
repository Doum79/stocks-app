import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from 'src/app/models/order.model';
import { environment } from 'src/environments/environment';

@Injectable()
export class PurchaseOrderClient {
  private readonly routeBase = 'api/orders';

  constructor(private readonly httpClient: HttpClient) {}

  public makeAnOrder(order: Order): Observable<{ message: string }> {
    const url = `${environment.apiBaseUrl}/${this.routeBase}`;
    return this.httpClient.post<{ message: string }>(url, order);
  }
}
