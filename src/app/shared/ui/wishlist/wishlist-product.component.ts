import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
  input,
} from '@angular/core';
import { HeartSVGComponent } from '@shared/ui/wishlist/svg/heart-svg.component';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-heart-svg (click)="toggleWishlist()" [isDesired]="isDesired()" />
    <span (click)="toggleWishlist()">Wishlist</span>
  `,
  imports: [HeartSVGComponent],
})
export class WishlistProductComponent {
  isDesired = input<boolean>();
  // TODO
  /*   @Input({ required: true, transform: booleanAttribute }) public isDesired =
    false; */
  @Output() public onClickHeartEvent = new EventEmitter<boolean>();

  public toggleWishlist(): void {
    // this.isDesired = !this.isDesired;
    this.onClickHeartEvent.emit(!this.isDesired());
  }
}
