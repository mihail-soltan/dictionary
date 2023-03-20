import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/services/shared.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  constructor(private sharedService: SharedService) {}
  darkmode: boolean = false;
  fonts: any[] = [
    { font: 'Sans Serif', class: 'inter' },
    { font: 'Serif', class: 'lora' },
    { font: 'Mono', class: 'inconsolata' },
  ];
  currentFont: string = 'Sans Serif';
  isFontSelectOpen: boolean = false;

  ngOnInit(): void {
    this.sharedService.darkmode.subscribe((value: boolean) => {
      this.darkmode = value;
    });
  }

  toggleTheme() {
    this.sharedService.toggleTheme();
  }

  toggleFontSelect() {
    this.isFontSelectOpen = !this.isFontSelectOpen;
  }

  changeFont(font: any) {
    this.currentFont = font.font;
    this.toggleFontSelect();
    this.sharedService.setCurrentFont(font.class);
  }
}
