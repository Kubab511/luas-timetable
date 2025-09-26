import { Pipe, PipeTransform, inject } from '@angular/core';
import { Router } from '@angular/router';
import { stopNames } from '../stops/stopNames';

@Pipe({
    name: 'translateStopName',
})
export class translateStopNamePipe implements PipeTransform {
  private router = inject(Router);

  transform(value: string): string {
    const currentUrl = this.router.url;
    
    if (currentUrl === '/ga' && stopNames[value]) {
      return stopNames[value];
    }
    
    return value;
  }
}