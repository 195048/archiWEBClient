import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class RatingService {

  API_URL = 'http://139.59.136.122:8000/api/ratings/';

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  getHttpOptions() {
    return {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': `Bearer ${localStorage.getItem('jwt_token')}`
      })
    };
  }

  rateMovie( movieTitle: string, ratingData: { score: number, review: string }): Observable<any> {
    const email = localStorage.getItem('email');
    console.log({ email, title: movieTitle, ...ratingData });
    return this.http.post<any>(`${this.API_URL}`, { email, title: movieTitle, ...ratingData }, this.getHttpOptions());
  }

  updateRating(movieTitle: string, ratingData: { score: number, review: string }): Observable<any> {
    const email = localStorage.getItem('email');
    return this.http.put<any>(`${this.API_URL}${email}/${encodeURIComponent(movieTitle)}`, ratingData, this.getHttpOptions());
  }

  getRating(movieTitle: string): Observable<any> {
    const email = localStorage.getItem('email');
    return this.http.get<any>(`${this.API_URL}${email}/${encodeURIComponent(movieTitle)}`, this.getHttpOptions());
  }

  getMyRatings(): Observable<any> {
    const email = localStorage.getItem('email');
    console.log(`${this.API_URL}user/${email}`);
    return this.http.get<any>(`${this.API_URL}user/${email}`, this.getHttpOptions());
  }

}
