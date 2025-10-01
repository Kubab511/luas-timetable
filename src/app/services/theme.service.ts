import { Injectable, signal, effect } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private readonly THEME_STORAGE_KEY = 'theme';
  private readonly DARK_MODE_CLASS = 'dark-mode';
  
  isDarkMode = signal<boolean>(false);

  constructor() {
    this.initializeTheme();
    
    effect(() => {
      this.applyTheme(this.isDarkMode());
    });
  }

  private initializeTheme(): void {
    const savedTheme = localStorage.getItem(this.THEME_STORAGE_KEY);
    
    if (savedTheme !== null) {
      this.isDarkMode.set(savedTheme === 'dark');
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      this.isDarkMode.set(prefersDark);
    }
  }

  toggleTheme(): void {
    this.isDarkMode.update(current => !current);
    this.saveThemePreference();
  }

  setDarkMode(isDark: boolean): void {
    this.isDarkMode.set(isDark);
    this.saveThemePreference();
  }

  private applyTheme(isDark: boolean): void {
    if (isDark) {
      document.documentElement.classList.add(this.DARK_MODE_CLASS);
    } else {
      document.documentElement.classList.remove(this.DARK_MODE_CLASS);
    }
  }

  private saveThemePreference(): void {
    const theme = this.isDarkMode() ? 'dark' : 'light';
    localStorage.setItem(this.THEME_STORAGE_KEY, theme);
  }

  listenToSystemThemeChanges(): void {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    mediaQuery.addEventListener('change', (e) => {
      const savedTheme = localStorage.getItem(this.THEME_STORAGE_KEY);
      if (savedTheme === null) {
        this.isDarkMode.set(e.matches);
      }
    });
  }
}
