import { Component, Input } from '@angular/core';
import { Timetable } from '../types/timetable';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-display-timetable',
  imports: [
    CommonModule
  ],
  templateUrl: './display-timetable.html',
  styleUrl: './display-timetable.scss'
})
export class DisplayTimetable {
 @Input() timetable: Timetable | undefined = undefined;


}
