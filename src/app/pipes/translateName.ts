import { Pipe, PipeTransform, inject } from '@angular/core';
import { Router } from '@angular/router';
import { stops } from '../stops/stops';

@Pipe({
  name: 'translateStopName',
})
export class TranslateStopNamePipe implements PipeTransform {
  private router = inject(Router);

  transform(value: string): string {
    const currentUrl = this.router.url;
    
    if (currentUrl === '/ga') {
      const stop = stops.find(s => s.nameEN === value);
      return stop ? stop.nameGA : value;
    }
    
    return value;
  }
}
