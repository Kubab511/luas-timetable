import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TimetableService } from '../services/timetable-service';
import { DisplayTimetable } from '../display-timetable/display-timetable';
import { lang } from '../types/lang';
import { translateStopNamePipe } from '../pipes/translateName';
import { stops } from '../stops/stops';

@Component({
  selector: 'app-stop-selector',
  imports: [
    CommonModule,
    FormsModule,
    DisplayTimetable,
    translateStopNamePipe
  ],
  templateUrl: './stop-selector.html',
  styleUrl: './stop-selector.scss'
})
export class StopSelector implements OnInit {
  constructor(private timetableService: TimetableService) {}
  @Input() locale: lang = lang.EN;
  
  stops = stops;
  selectedStop = '';
  luasData: any = null;
  loading = false;
  error = '';

  ngOnInit(): void {
    this.selectedStop = localStorage.getItem("lastStop") ?? '';
    if (this.selectedStop !== '') 
      this.fetchLuasData();
  }

  onStopSelect() {
    if (this.selectedStop) {
      this.fetchLuasData();
      localStorage.setItem("lastStop", this.selectedStop);
    }
  }

  private fetchLuasData() {
    const selectedStopObj = this.stops.find(stop => stop.code === this.selectedStop);
    // to się nie stanie ale lepiej mieć
    if (!selectedStopObj) {
      this.error = 'Stop not found';
      return;
    }
    
    const stopCode = selectedStopObj.code;
    this.loading = true;
    this.error = '';
    this.luasData = null;

    this.timetableService.getTimetable(stopCode).subscribe({
      next: (data) => {
        this.luasData = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Error while fetching data';
        this.loading = false;
        console.error('API Error:', err);
      }
    });
  }

  get chooseStop() {
    return (this.locale === lang.EN) ? "Choose a stop" : "Roghnaigh stad"
  }

  get loadingData() {
    return (this.locale === lang.EN) ? "Loading data..." : "Sonraí á lódáil..." ;
  }
}
