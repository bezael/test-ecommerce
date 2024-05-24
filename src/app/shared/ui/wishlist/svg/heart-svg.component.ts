import {
  ChangeDetectionStrategy,
  Component,
  Input,
  booleanAttribute,
} from '@angular/core';

@Component({
  selector: 'app-heart-svg',
  standalone: true,
  templateUrl: './heart.component.svg',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeartSVGComponent {
  // isDesired = input<boolean>();
  // Should be done with model signal
  @Input({ required: true, transform: booleanAttribute }) public isDesired =
    false;
}
