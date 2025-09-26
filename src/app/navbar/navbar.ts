import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { lang } from '../types/lang';

@Component({
  selector: 'app-navbar',
  imports: [],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss'
})
export class Navbar {
  @Input() locale: lang = lang.EN;
  lang = lang;

  constructor(private router: Router) {
    console.log(this.locale);
  }

  get heading() {
    return (this.locale === lang.EN) ? "Luas Timetable" : "Amchlár Luais";
  }
  
  switchLanguage(newLang: lang) {
    if (this.locale !== newLang) {
      const targetRoute = newLang === lang.GA ? '/ga' : '/';
      this.router.navigate([targetRoute]);
    }
  }
}
