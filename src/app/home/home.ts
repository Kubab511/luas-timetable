import { Component } from '@angular/core';
import { StopSelector } from '../stop-selector/stop-selector';

@Component({
  selector: 'app-home',
  imports: [StopSelector],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home {

}
