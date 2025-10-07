import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TimetableService } from '../services/timetable.service';
import { DisplayTimetable } from '../display-timetable/display-timetable';
import { lang } from '../types/lang';
import { TranslateStopNamePipe } from '../pipes/translateName';
import { stops } from '../stops/stops';
import { line } from '../types/stopType';
import { BehaviorSubject, distinctUntilChanged, filter, interval, startWith, Subscription, switchMap, retry, catchError, EMPTY, timer } from 'rxjs';

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
  filteredStops = stops;
  selectedStop = '';
  selectedLine = '';
  stopCode$ = new BehaviorSubject<string>(this.selectedStop);
  luasData: any = null;
  loading = false;
  error = '';

  onLineSelect() {
    if (this.selectedLine) {
      localStorage.setItem("lastLine", this.selectedLine);
    }

    switch (this.selectedLine) {
      case 'green':
        this.filteredStops = this.stops.filter(stop => stop.line === line.GREEN);
        break;
      case 'red':
        this.filteredStops = this.stops.filter(stop => stop.line === line.RED);
        break;
      default:
        this.filteredStops = this.stops;
        break;
    }

    if (this.selectedStop && !this.filteredStops.some(stop => stop.code === this.selectedStop)) {
      this.selectedStop = '';
      this.luasData = null;
    }
  }

  ngOnInit(): void {
    const initialStop = localStorage.getItem("lastStop");
    const initialLine = localStorage.getItem("lastLine");

    if (initialStop) {
      this.selectedStop = initialStop;
      this.stopCode$.next(this.selectedStop);
    }

    if (initialLine) {
      this.selectedLine = initialLine;
      this.onLineSelect();
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
          switchMap(() => this.timetableService.getTimetable(code).pipe(
            retry({ count: 10, delay: () => timer(1000) }),
            catchError((err) => {
              console.error('API Error:', err);
              this.error = this.errorFetching;
              this.loading = false;
              return EMPTY;
            })
          ))
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
    } else {
      this.luasData = null;
    }
  }

  get chooseStop() {
    return (this.locale === lang.EN) ? "Choose a stop" : "Roghnaigh stad";
  }

  get greenLine() {
    return (this.locale === lang.EN) ? "Green Line" : "Líne Uaine";
  }

  get redLine() {
    return (this.locale === lang.EN) ? "Red Line" : "Líne Dhearg";
  }

  get bothLines() {
    return (this.locale === lang.EN) ? "All lines" : "Gach líne";
  }

  get loadingData() {
    return (this.locale === lang.EN) ? "Loading data..." : "Sonraí á lódáil...";
  }

  get errorFetching() {
    return (this.locale === lang.EN) ? "Error while loading data" : "Earráid nuair sonraí á lódáil";
  }
}
