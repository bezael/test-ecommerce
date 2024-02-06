import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ProductsService } from '../../api/products.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [JsonPipe],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent {
  private readonly productSvc = inject(ProductsService);
  products = this.productSvc.products;
}
