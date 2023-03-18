import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/services/shared.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.css'],
})
export class SearchbarComponent implements OnInit {
  darkmode: boolean = false;
  searchFormGroup: any;

  
  constructor(private router: Router, private sharedService: SharedService) {}

  ngOnInit(): void {
    this.sharedService.darkmode.subscribe((value: boolean) => {
      this.darkmode = value;
    });
    this.searchFormGroup = new FormGroup({
      search: new FormControl('', [Validators.required]),
    });
  }
  get search() {
    return this.searchFormGroup.get('search');
  }

  onSearch() {
    this.searchFormGroup.submitted = true;
    if (this.searchFormGroup.invalid) {
      return;
    }
    this.router.navigate(['/search', this.searchFormGroup.value.search]);
  }
}
