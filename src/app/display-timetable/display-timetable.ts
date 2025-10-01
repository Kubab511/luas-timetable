import { Component, Input } from '@angular/core';
import { Timetable } from '../types/timetable';
import { CommonModule } from '@angular/common';
import { TranslateStopNamePipe } from '../pipes/translateName';
import { lang } from '../types/lang';
import { stops } from '../stops/stops';
import { line } from '../types/stopType';

@Component({
  selector: 'app-display-timetable',
  imports: [
    CommonModule,
    TranslateStopNamePipe
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

  get stopLineClass() {
    if (!this.timetable) return '';
    
    const stop = stops.find(s => s.code === this.timetable!.stop.abbreviation);
    if (!stop) return '';
    
    return stop.line === line.GREEN ? 'green-line' : 'red-line';
  }

  get northbound() {
    return (this.locale === lang.EN) ? "Northbound" : "Ó thuaidh";
  }

  get southbound() {
    return (this.locale === lang.EN) ? "Southbound" : "Ó dheas";
  }

  get eastbound() {
    return (this.locale === lang.EN) ? "Eastbound" : "Soir";
  }

  get westbound() {
    return (this.locale === lang.EN) ? "Westbound" : "Siar";
  }

  get lastRefreshed() {
    return (this.locale === lang.EN) ? "Last refreshed" : "Athnuachan deireanach";
  }

  get noTrams() {
    return (this.locale === lang.EN) ? "No trams" : "Gan tramanna";
  }

  get minutes() {
    return (this.locale === lang.EN) ? "min" : "nóim";
  }

  getDirectionName(directionName: string): string {
    if (!this.timetable) return directionName;
    
    const stop = stops.find(s => s.code === this.timetable!.stop.abbreviation);
    if (!stop) return directionName;
    
    const isInbound = directionName.toLowerCase().includes('inbound');
    const isOutbound = directionName.toLowerCase().includes('outbound');
    
    if (stop.line === line.GREEN) {
      if (isInbound) return this.northbound;
      if (isOutbound) return this.southbound;
    } else if (stop.line === line.RED) {
      if (isInbound) return this.eastbound;
      if (isOutbound) return this.westbound;
    }
    
    return directionName;
  }
}
