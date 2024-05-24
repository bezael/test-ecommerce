import {
  ChangeDetectionStrategy,
  Component,
  output,
  signal
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
    <button
      (click)="onAddToCart()"
      class="px-2 py-1 text-white bg-orange-500 rounded hover:bg-orange-700"
    >
      {{ buttonConfig().text }}
    </button>
  `,
})
export class AddToCartComponent {
  buttonConfig = signal<AddToCartConfig>(defaultConfig);
  addToCartEvent = output();

  onAddToCart() {
    this.addToCartEvent.emit();
  }
}
