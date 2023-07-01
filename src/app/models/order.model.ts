import { OrderItem } from './order-item.model';

export interface Order {
  orderItems: OrderItem[];
  clientFullName: string;
}
