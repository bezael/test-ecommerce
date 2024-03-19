import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
  input,
  output,
} from '@angular/core';

@Component({
  selector: 'app-filter',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <h2 class="text-center font-bold text-4xl max-w-lg mx-auto text-slate-900">
      <span
        class="text-transparent bg-clip-text bg-gradient-to-br from-orange-500 from-20%  via-orange-600 via-30% to-orange-700"
        >Popular</span
      >
      categories
    </h2>
    <ul class="flex flex-wrap gap-3 py-10 items-center justify-center">
      <li>
        <button
          type="button"
          (click)="onClick('all')"
          class="bg-orange-500 text-md font-medium px-5 capitalize py-2 rounded-md hover:bg-orange-700 flex items-center gap-2 text-white ease-linear duration-300"
        >
          {{ 'ALL' }}
        </button>
      </li>
      @for (category of categories(); track $index) {
        <li>
          <button
            type="button"
            (click)="onClick(category)"
            class="bg-orange-500 text-md font-medium px-5 capitalize py-2 rounded-md hover:bg-orange-700 flex items-center gap-2 text-white ease-linear duration-300"
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

  public onClick(category: string): void {
    this.categoryEvent.emit(category);
  }
}
