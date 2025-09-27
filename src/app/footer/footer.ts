import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  imports: [],
  templateUrl: './footer.html',
  styleUrl: './footer.scss'
})
export class Footer {
  constructor(private router: Router) {}

  get footerMessage() {
    return (this.router.url === '/ga') ? "Déanta le \u2665 ag " : "Made with \u2665 by ";
  }
}
