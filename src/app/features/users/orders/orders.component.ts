import { CurrencyPipe } from '@angular/common';
import { Component } from '@angular/core';

type OrderStatus = 'Cancelled' | 'Delivered' | 'Pending';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './orders.component.html',
})
export default class OrdersComponent {
  orders: any[] = [
    {
      id: '1001',
      fecha: '2024-03-01',
      estatus: 'Delivered',
      total: 299.99,
    },
    {
      id: '1002',
      fecha: '2024-03-02',
      estatus: 'Pending',
      total: 159.99,
    },
    {
      id: '1003',
      fecha: '2024-03-02',
      estatus: 'Cancelled',
      total: 89.99,
    },
    {
      id: '1004',
      fecha: '2024-03-03',
      estatus: 'Delivered',
      total: 49.99,
    },
    {
      id: '1005',
      fecha: '2024-03-04',
      estatus: 'Pending',
      total: 199.99,
    },
    {
      id: '1006',
      fecha: '2024-03-05',
      estatus: 'Cancelled',
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
