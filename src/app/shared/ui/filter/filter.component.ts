import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';

@Component({
  selector: 'app-filter',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './filter.component.scss',
  template: `
    <h2 class="heading">
      <span class="highlight">Popular</span>
      categories
    </h2>
    <ul class="list-container">
      <li>
        <button type="button" (click)="onClick('all')" class="btn btn-hover">
          {{ 'ALL' }}
        </button>
      </li>
      <!-- ngFor  -->
      @for (category of categories(); track $index) {
        <li>
          <button
            type="button"
            (click)="onClick(category)"
            class="btn btn-hover"
          >
            {{ category }}
          </button>
        </li>
      }
    </ul>
  `,
})
export class FilterComponent {
  readonly categories = input.required<any>();
  categoryEvent = output<string>();

  onClick(category: string): void {
    this.categoryEvent.emit(category);
  }
}
