import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/users';

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      map((users) => {
        const user = users.find(
          (u) => u.email === email && u.password === password
        );
        if (user) {
          localStorage.setItem('token', user.token);
          localStorage.setItem('role', user.role); // ✅ set from DB
          localStorage.setItem('email', user.email);
          return { token: user.token, role: user.role };
        } else {
          throw new Error('Invalid email or password');
        }
      }),
      catchError((error) => {
        console.error('Login failed:', error.message);
        return of(null);
      })
    );
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('email');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  getRole(): string | null {
    return localStorage.getItem('role');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }
}
