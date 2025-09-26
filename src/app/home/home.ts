import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
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

  constructor(private router: Router, private titleService: Title) {}

  ngOnInit() {
    const currentRoute = this.router.url;
    this.locale = (currentRoute === '/ga') ? lang.GA : lang.EN;
    
    this.updatePageTitle();
  }

  private updatePageTitle() {
    const title = this.locale === lang.EN ? 'Luas Timetable' : 'Amchlár Luais';
    this.titleService.setTitle(title);
  }
}
