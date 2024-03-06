import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-heart-svg',
  standalone: true,
  templateUrl: './heart.component.svg',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeartSVGComponent {
  isDesired = input<boolean>();
  // TODO
  /*   @Input({ required: true, transform: booleanAttribute }) public isDesired =
    false; */
}
