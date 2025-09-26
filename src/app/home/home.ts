import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StopSelector } from '../stop-selector/stop-selector';
import { Navbar } from '../navbar/navbar';
import { lang } from '../types/lang';

@Component({
  selector: 'app-home',
  imports: [
    StopSelector,
    Navbar
  ],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home implements OnInit {
  locale: lang = lang.EN;

  constructor(private router: Router) {}

  ngOnInit() {
    const currentRoute = this.router.url;
    if (currentRoute === '/ga') {
      this.locale = lang.GA;
    } else {
      this.locale = lang.EN;
    }
  }

  
}
