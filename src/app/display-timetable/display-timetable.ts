import { Component, Input } from '@angular/core';
import { Timetable } from '../types/timetable';
import { CommonModule } from '@angular/common';
import { translateStopNamePipe } from '../pipes/translateName';
import { lang } from '../types/lang';

@Component({
  selector: 'app-display-timetable',
  imports: [
    CommonModule,
    translateStopNamePipe
  ],
  templateUrl: './display-timetable.html',
  styleUrl: './display-timetable.scss'
})
export class DisplayTimetable {
  @Input() timetable: Timetable | undefined = undefined;
  @Input() locale: lang = lang.EN;

  get due() {
    return (this.locale === lang.EN) ? "NOW" : "ANOIS"
  }
}
