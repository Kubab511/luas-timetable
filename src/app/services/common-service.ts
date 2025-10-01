import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  private isDark: boolean = false;
  private readonly DARK_MODE_KEY = 'darkMode';

  constructor() {
    this.loadDarkModeFromStorage();
  }

  setDark(value: boolean) {
    this.isDark = value;
    this.saveDarkModeToStorage(value);
  }

  getDark() {
    return this.isDark;
  }

  private loadDarkModeFromStorage(): void {
    const savedDarkMode = localStorage.getItem(this.DARK_MODE_KEY);
    if (savedDarkMode !== null) {
      this.isDark = savedDarkMode === 'true';
    }
  }

  private saveDarkModeToStorage(value: boolean): void {
    localStorage.setItem(this.DARK_MODE_KEY, value.toString());
  }
}
