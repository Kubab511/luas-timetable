import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { lang } from '../types/lang';
import { ThemeService } from '../services/theme.service';

@Component({
  selector: 'app-navbar',
  imports: [],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss'
})
export class Navbar {
  @Input() locale: lang = lang.EN;
  lang = lang;
  isDropdownOpen = false;

  constructor(private router: Router, protected themeService: ThemeService) { }

  get heading() {
    return (this.locale === lang.EN) ? "Luas Timetable" : "Amchlár an Luais";
  }
  
  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }
  
  toggleDarkMode() {
    this.themeService.toggleTheme();
  }
  
  selectLanguage(newLang: lang) {
    this.isDropdownOpen = false;
    if (this.locale !== newLang) {
      const targetRoute = newLang === lang.GA ? '/ga' : '/';
      localStorage.setItem("lang", (newLang === lang.GA) ? 'ga' : 'en');
      this.router.navigate([targetRoute]);
    }
  }
  
  switchLanguage(newLang: lang) {
    if (this.locale !== newLang) {
      const targetRoute = newLang === lang.GA ? '/ga' : '/';
      this.router.navigate([targetRoute]);
    }
  }
}
