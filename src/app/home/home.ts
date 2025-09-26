import { Component } from '@angular/core';
import { StopSelector } from '../stop-selector/stop-selector';
import { Navbar } from '../navbar/navbar';

@Component({
  selector: 'app-home',
  imports: [
    StopSelector,
    Navbar
  ],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home {

}
