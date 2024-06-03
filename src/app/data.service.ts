import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private apiUrl = 'http://localhost:3000/';

  constructor(private http: HttpClient) {}

  getData(): Observable<any> {
    return this.http.get(this.apiUrl).pipe(
      catchError((error) => {
        console.error('Error fetching data:', error);
        throw error;
      })
    );
  }
  login(body: any): Observable<any> {
    return this.http.post(this.apiUrl + 'login', body).pipe(
      catchError((error) => {
        throw error;
      })
    );
  }
  register(body: any): Observable<any> {
    return this.http.post(this.apiUrl + 'Registration', body).pipe(
      catchError((error) => {
        throw error;
      })
    );
  }
}
