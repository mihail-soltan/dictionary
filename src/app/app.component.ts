import { Component, OnInit } from '@angular/core';
import { SharedService } from './services/shared.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'dictionary-web-app';

  darkmode: boolean = false;
  constructor(private sharedService: SharedService) {}

  ngOnInit(): void {
    this.sharedService.darkmode.subscribe((value: boolean) => {
      this.darkmode = value;
    });
    if (localStorage.getItem('darkmode') === null) {
      localStorage.setItem('darkmode', 'false');
    }
  }
}
