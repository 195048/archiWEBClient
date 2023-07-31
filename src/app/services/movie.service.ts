import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  private apiUrl = 'http://139.59.136.122:8000/api'; 

  constructor(private http: HttpClient) { }

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('jwt_token'); // replace 'jwt_token' with the key you have used to store the token
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    if (token) {
      headers = headers.append('Authorization', `Bearer ${token}`);
    }
    return headers;
  }

  getMovies(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/movies`, { headers: this.getHeaders() });
  }

  getMovie(id: string): Observable<any> {
    const url = `${this.apiUrl}/movies/${id}`;
    return this.http.get<any>(url,{ headers: this.getHeaders() });
  }
  

  // other methods like createMovie, updateMovie, deleteMovie, etc...
}
