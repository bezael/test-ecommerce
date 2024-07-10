import {
  ChangeDetectionStrategy,
  Component,
  Input,
  output,
} from '@angular/core';
import { Product } from '@shared/models/product.interface';
import { HeartSVGComponent } from '@shared/ui/wishlist/svg/heart-svg.component';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-heart-svg (click)="toggleWishlist()" [isDesired]="isDesired" />
    <span (click)="toggleWishlist()">Wishlist</span>
  `,
  imports: [HeartSVGComponent],
})
export class WishlistProductComponent {
  onClickHeartEvent = output<number>();
  @Input({ required: true }) public product!: Product;
  isDesired = false;

  // product = input.required<Product | undefined>();
  // isDesired:any;
  // isDesired = computed(() => this.product()?.isDesired)
  /*   isDesired = computed(() => {
    return this.product()?.isDesired;
});
 */
  /*   effect = (() => {
    this.isDesired = this.product()?.isDesired;
  }); */

  // isDesired = input<boolean>();
  /*  @Input({ required: true, transform: booleanAttribute }) public isDesired =
    false; */

  public toggleWishlist(): void {
    this.isDesired = !this.isDesired;
    this.product.isDesired = this.isDesired;
    this.onClickHeartEvent.emit(this.product.id);
  }
}
