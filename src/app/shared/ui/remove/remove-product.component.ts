import { Component, EventEmitter, Output } from '@angular/core';
import { RemoveSVGComponent } from './svg/remove-svg.component';

@Component({
  selector: 'app-remove-product',
  standalone: true,
  template: `
    <app-remove-svg (click)="onRemoveProduct()" />
    <span (click)="onRemoveProduct()">Remove</span>
  `,
  imports: [RemoveSVGComponent],
})
export class RemoveProductComponent {
  @Output() public onClickRemoveProduct = new EventEmitter<boolean>();

  public onRemoveProduct(): void {
    this.onClickRemoveProduct.emit();
  }
}
