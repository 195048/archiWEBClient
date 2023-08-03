// user.service.ts
import { Injectable } from '@angular/core'; // Import Injectable
import { HttpClient } from '@angular/common/http';
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

  getUserById(id: string): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${id}`);
  }

  updateUser(user: User): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/${user.email}`, user);
  }

  verifyPassword(email: string, password: string): Observable<boolean> {
    // Assume /login returns { token: string }
    return this.http.post<{ token: string }>(`${this.apiUrl}/login`, { email, password })
      .pipe(map((response: { token: string }) => {
        if (response.token) {
          localStorage.setItem('token', response.token);
          return true;
        } else {
          return false;
        }
      }));
}
}
