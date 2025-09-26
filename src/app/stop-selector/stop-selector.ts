import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TimetableService } from '../services/timetable-service';
import { DisplayTimetable } from '../display-timetable/display-timetable';
import { lang } from '../types/lang';
import { stopCodes } from '../stops/stopCodes';
import { translateStopNamePipe } from '../pipes/translateName';

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
  
  stopCodesData = stopCodes;
  stopNames = Object.keys(this.stopCodesData);
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
    const stopCode = this.stopCodesData[this.selectedStop];
    this.loading = true;
    this.error = '';
    this.luasData = null;

    this.timetableService.getTimetable(stopCode).subscribe({
      next: (data) => {
        this.luasData = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Błąd podczas pobierania danych';
        this.loading = false;
        console.error('API Error:', err);
      }
    });
  }

  get chooseStop() {
    return (this.locale === lang.EN) ? "Choose a stop" : "Roghnaigh stad"
  }
}
