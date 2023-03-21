import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SharedService } from 'src/app/services/shared.service';
import { tap, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-word',
  templateUrl: './word.component.html',
  styleUrls: ['./word.component.css'],
})
export class WordComponent implements OnInit {
  loading: boolean = false;
  darkmode: boolean = false;
  error = {
    emoji: '😕',
    status: 0,
    title: '',
    message: '',
    resolution: '',
  };
  isError: boolean = false;
  words: any = [];
  currentFont: string = 'Sans Serif';
  @ViewChild('audioRef') audioRef!: ElementRef<HTMLAudioElement>;
  audio: string = '';
  constructor(
    private route: ActivatedRoute,
    private sharedService: SharedService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.getWord(params['word']);
    });
    this.sharedService.darkmode.subscribe((value: boolean) => {
      this.darkmode = value;
    });
    this.sharedService.currentFont.subscribe((value: string) => {
      this.currentFont = value;
    });
  }

  playAudio() {
    this.audioRef.nativeElement.play();
    console.log(this.audioRef.nativeElement.getAttribute('src'));
  }

  getWord(word: string) {
    this.loading = true;
    this.sharedService
      .getWord(word)
      .pipe(
        tap((data) => {
          console.log(data);
        }),
        catchError((err) => {
          this.loading = false;
          this.isError = true;
          this.error.status = err.status;
          this.error.title = err.error.title;
          this.error.message = err.error.message;
          this.error.resolution = err.error.resolution;
          console.log(this.error);
          return throwError(err);
        })
      )
      .subscribe((data) => {
        this.loading = false;
        this.isError = false;
        this.words = data;
      });
  }
  filterPhonetics(phonetics: any[]) {
    const filteredPhonetics = phonetics.filter((phonetic) => phonetic['audio'].length > 0);
    return filteredPhonetics.length > 0 ? filteredPhonetics[0].audio : '';
  }
}
