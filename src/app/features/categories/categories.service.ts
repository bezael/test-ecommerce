import { Injectable, signal } from '@angular/core';
import { APIService } from '@api/api.service';
import { tap } from 'rxjs';

/* export interface CategoryWithId {
  id: number;
  categoryName: string;
}
 */
@Injectable({ providedIn: 'root' })
export class CategoryService extends APIService {
  readonly categories = signal<string[]>([]);
  private readonly _endPoint = '/products/categories';

  constructor() {
    super();
    this._getCategories();
  }

  private _getCategories(): void {
    this.get<string[]>(this._endPoint)
      .pipe(tap((categories: string[]) => this.categories.set(categories)))
      .subscribe();
  }
}
