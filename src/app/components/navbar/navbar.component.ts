import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/services/shared.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private sharedService: SharedService) { }
darkmode: boolean = false;
  ngOnInit(): void {
    this.sharedService.darkmode.subscribe((value: boolean) => {
      this.darkmode = value;
    })
  }

  toggleTheme() {
    this.sharedService.toggleTheme();
    console.log(this.darkmode)
  }
}
