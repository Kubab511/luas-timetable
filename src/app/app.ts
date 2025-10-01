import { Component, OnInit, signal, Renderer2, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { Footer } from './footer/footer';
import { CommonService } from './services/common-service';

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

  constructor(
    private router: Router,
    private renderer: Renderer2,
    @Inject(DOCUMENT) private document: Document,
    private commonService: CommonService
  ) {}

  ngOnInit(): void {
    const savedLang = localStorage.getItem('lang');
    if (savedLang === 'ga') {
      this.router.navigate([savedLang]);
    }
    
    this.updateDarkModeClass();
    
    this.watchDarkModeChanges();
  }
  
  private updateDarkModeClass(): void {
    const isDark = this.commonService.getDark();
    if (isDark) {
      this.renderer.addClass(this.document.body, 'dark-mode');
    } else {
      this.renderer.removeClass(this.document.body, 'dark-mode');
    }
  }
  
  private watchDarkModeChanges(): void {
    // Check for changes periodically (simple approach)
    setInterval(() => {
      this.updateDarkModeClass();
    }, 100);
  }
}
