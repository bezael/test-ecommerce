import { Injectable } from '@angular/core';
import { APIService } from '@api/api.service';
import { Observable } from 'rxjs';

/* export interface Category {
  [key: string]: string;
} */

@Injectable({ providedIn: 'root' })
export class CategoryService extends APIService {
  private readonly _endPoint = '/products/categories';

  public getCategories(): Observable<string[]> {
    return this.get<string[]>(this._endPoint);
  }
}
