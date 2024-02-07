import { CurrencyPipe, SlicePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Product } from '@shared/models/product.interface';

function addDiscountProperty(product: any) {
  return { discount: false, ...product };
}

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [RouterLink, CurrencyPipe, SlicePipe],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardComponent {
  @Input({ required: true, transform: addDiscountProperty }) product!: Product;
}
