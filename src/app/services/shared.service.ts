import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  currentTheme = localStorage.getItem('darkmode');
  darkmode = new BehaviorSubject(eval(this.currentTheme!));

  constructor() {}

  toggleTheme() {
    if (this.darkmode.value === false) {
      this.darkmode.next(true);
      localStorage.setItem('darkmode', 'true');
    } else {
      this.darkmode.next(false);
      localStorage.setItem('darkmode', 'false');
    }
  }

}
