import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TimetableService {
  private baseUrl = 'https://api.barabasz.dev/v1/luas?stop=';
  constructor(private http: HttpClient) {}

  getTimetable(stopCode: string) {
    return this.http.get(`${this.baseUrl}${stopCode}`);
  }
}
