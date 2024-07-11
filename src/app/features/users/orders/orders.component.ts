import { CurrencyPipe } from '@angular/common';
import { Component } from '@angular/core';

type OrderStatus = 'Cancelled' | 'Delivered' | 'Pending';

interface Order {
  id: string;
  date: string;
  status: OrderStatus;
  total: number;
}

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './orders.component.html',
})
export default class OrdersComponent {
  orders: Order[] = [
    {
      id: '1001',
      date: '2024-03-01',
      status: 'Delivered',
      total: 299.99,
    },
    {
      id: '1002',
      date: '2024-03-02',
      status: 'Pending',
      total: 159.99,
    },
    {
      id: '1003',
      date: '2024-03-02',
      status: 'Cancelled',
      total: 89.99,
    },
    {
      id: '1004',
      date: '2024-03-03',
      status: 'Delivered',
      total: 49.99,
    },
    {
      id: '1005',
      date: '2024-03-04',
      status: 'Pending',
      total: 199.99,
    },
    {
      id: '1006',
      date: '2024-03-05',
      status: 'Cancelled',
      total: 349.99,
    },
  ];

  public getClassOrderStatus(status: OrderStatus): string {
    const classes = {
      Cancelled: 'canceled',
      Delivered: 'succeeded',
      Pending: 'processing',
    } as const;

    return classes[status];
  }
}
