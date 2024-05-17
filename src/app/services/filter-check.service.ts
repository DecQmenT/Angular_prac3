import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FilterCheckService {
  private selectedValueSubject = new BehaviorSubject<string>(''); // Initial value is empty string
  selectedValue$ = this.selectedValueSubject.asObservable();

  constructor() { }

  setSelectedValue(value: string) {
    this.selectedValueSubject.next(value);
  }
}
