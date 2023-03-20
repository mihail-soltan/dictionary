import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  currentTheme = localStorage.getItem('darkmode');
  darkmode = new BehaviorSubject(eval(this.currentTheme!));
  currentFont = new BehaviorSubject('inter');

  apiUrl = 'https://api.dictionaryapi.dev/api/v2/entries/en';
  constructor(private http: HttpClient) {}

  toggleTheme() {
    if (this.darkmode.value === false) {
      this.darkmode.next(true);
      localStorage.setItem('darkmode', 'true');
    } else {
      this.darkmode.next(false);
      localStorage.setItem('darkmode', 'false');
    }
  }

  getWord(word: string) {
    return this.http.get(`${this.apiUrl}/${word}`);
  }

  setCurrentFont(font: string) {
    this.currentFont.next(font);
  }
}
