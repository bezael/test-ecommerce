import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  showCart = false;
  totalProducts = 5;
  products = [
    { name: 'Producto', price: 100 },
    { name: 'Apple', price: 150 },
    { name: 'Mango', price: 300 },
    { name: 'Producto', price: 200 },
  ];

  getTotal() {
    return 300;
  }
}
