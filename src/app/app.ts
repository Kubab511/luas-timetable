import { Component, OnInit, signal } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { Footer } from './footer/footer';
import { ThemeService } from './services/theme.service';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    Footer
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {
  protected readonly title = signal('luas-timetable');

  constructor(private router: Router, private themeService: ThemeService) {}

  ngOnInit(): void {
    const savedLang = localStorage.getItem('lang');
    if (savedLang === 'ga') {
      this.router.navigate([savedLang]);
    }

    this.themeService.listenToSystemThemeChanges();
  }
}
