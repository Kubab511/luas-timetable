import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { lang } from '../types/lang';
import { CommonService } from '../services/common-service';

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

  constructor(private router: Router, private commonService: CommonService) {}

  get isDarkMode(): boolean {
    return this.commonService.getDark();
  }

  toggleDarkMode() {
    const currentDarkMode = this.commonService.getDark();
    this.commonService.setDark(!currentDarkMode);
  }

  get heading() {
    return (this.locale === lang.EN) ? "Luas Timetable" : "Amchlár an Luais";
  }
  
  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
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
