import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private selectedCategorySubject = new BehaviorSubject<string>('');
  selectedCategory$ = this.selectedCategorySubject.asObservable();

  setSelectedCategory(category: string): void {
    this.selectedCategorySubject.next(category);
  }
}
