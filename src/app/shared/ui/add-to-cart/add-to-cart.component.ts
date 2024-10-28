import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';

interface AddToCartConfig {
  text: string;
}

const defaultConfig: AddToCartConfig = {
  text: 'Add to cart',
} as const;

@Component({
  selector: 'app-add-to-cart',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <button (click)="onAddToCart()" class="btn">
      {{ config().text }}
    </button>
  `,
  styleUrl: './add-to-cart.component.scss',
})
export class AddToCartComponent {
  /// buttonConfig = signal<AddToCartConfig>(defaultConfig);
  config = input<AddToCartConfig>(defaultConfig);
  addToCartEvent = output();

  onAddToCart(): void {
    this.addToCartEvent.emit();
  }
}
