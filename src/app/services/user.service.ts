import { Injectable } from '@angular/core'; // Import Injectable
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, pipe } from 'rxjs'; 
import { map } from 'rxjs/operators'; // Import map operator

export interface User {
  email: string;
  password: string;
  address: string;
  picture: string;
}



@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://139.59.136.122:8000/api/users';

  constructor(private http: HttpClient) {}

  getHttpOptions() {
    return {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': `Bearer ${localStorage.getItem('jwt_token')}`
      })
    };
  }

  getUserById(id: string): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${id}`,this.getHttpOptions());
  }

  updateUser(user: User): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${user.email}`, user, this.getHttpOptions());
  }

  verifyPassword(email: string, password: string): Observable<boolean> {
    // use login to verify password 
    // Here's a dummy implementation
    const res =  this.http.post<any>(`${this.apiUrl}/login`, {email, password}).pipe(
      map(response => response)
    );
    console.log(res);
    return res;
  }
}
