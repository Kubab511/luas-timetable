import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TimetableService } from '../services/timetable.service';
import { DisplayTimetable } from '../display-timetable/display-timetable';
import { lang } from '../types/lang';
import { TranslateStopNamePipe } from '../pipes/translateName';
import { stops } from '../stops/stops';
import { line } from '../types/stopType';
import { BehaviorSubject, catchError, distinctUntilChanged, EMPTY, filter, interval, startWith, Subscription, switchMap } from 'rxjs';

@Component({
  selector: 'app-stop-selector',
  imports: [
    CommonModule,
    FormsModule,
    DisplayTimetable,
    TranslateStopNamePipe
  ],
  templateUrl: './stop-selector.html',
  styleUrl: './stop-selector.scss'
})
export class StopSelector implements OnInit, OnDestroy {
  constructor(private timetableService: TimetableService) {}
  @Input() locale: lang = lang.EN;
  subscription: Subscription | null = null;
  
  stops = stops.filter(stop => stop.line != line.NONE);
  selectedStop = '';
  stopCode$ = new BehaviorSubject<string>(this.selectedStop);
  luasData: any = null;
  loading = false;
  error = '';

  ngOnInit(): void {
    const initialStop = localStorage.getItem("lastStop");

    if (initialStop) {
      this.selectedStop = initialStop;
      this.stopCode$.next(this.selectedStop);
    }

    this.subscription = this.stopCode$.pipe(
      filter(code => !!code),
      distinctUntilChanged(),
      switchMap((code) => {

        this.loading = true;
        this.error = '';
        this.luasData = null;
        
        return interval(30 * 1000).pipe(
          startWith(0),
          switchMap(() => this.timetableService.getTimetable(code)),
          catchError((err) => {
            console.error('API Error:', err);
            this.error = 'Error while fetching data';
            this.loading = false;
            return EMPTY; 
          })
        );
      })
    ).subscribe({
      next: (data) => {
        this.luasData = data;
        this.loading = false;
      }
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  onStopSelect() {
    if (this.selectedStop) {
      this.stopCode$.next(this.selectedStop);
      localStorage.setItem("lastStop", this.selectedStop);
    }
  }

  get chooseStop() {
    return (this.locale === lang.EN) ? "Choose a stop" : "Roghnaigh stad"
  }

  get loadingData() {
    return (this.locale === lang.EN) ? "Loading data..." : "Sonraí á lódáil..." ;
  }
}
