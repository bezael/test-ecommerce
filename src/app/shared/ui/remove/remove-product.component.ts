import { ChangeDetectionStrategy, Component, output } from '@angular/core';
import { RemoveSVGComponent } from './svg/remove-svg.component';

@Component({
  selector: 'app-remove-product',
  standalone: true,
  template: `
    <app-remove-svg (click)="onRemoveProduct()" />
    <span (click)="onRemoveProduct()">Remove</span>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RemoveSVGComponent],
})
export class RemoveProductComponent {
  onClickRemoveProduct = output();

  onRemoveProduct(): void {
    this.onClickRemoveProduct.emit();
  }
}
