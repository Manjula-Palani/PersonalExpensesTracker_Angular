import { Injectable } from '@angular/core';
import { map, Observable, of, switchMap, throwError } from 'rxjs';
import { users } from '../InterfaceFolder/userInterface';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:3000';
  private storageKey = 'et_current_user';
  constructor(private http: HttpClient) {}
  
  login(email: string, password: string): Observable<users | null> {
    return this.http.get<users[]>(`${this.baseUrl}/users?email=${email}&password=${password}`).pipe(map(users => {
    const user = users[0] ?? null;
    if (user) localStorage.setItem(this.storageKey, JSON.stringify(user));
      return user;
    }));
  }

  register(data: Partial<users>): Observable<users | string> {
    return this.http.get<users[]>(`${this.baseUrl}/users?email=${data.email}`).pipe(
      switchMap(users => {
        if (users.length > 0) {
          // Email already exists
          return throwError(() => new Error('Email already exists'));
        } else {
          // Email not found, proceed with registration
          return this.http.post<users>(`${this.baseUrl}/users`, data);
        }
      })
    );
  }

  logout() { 
    localStorage.removeItem(this.storageKey); 
  }

  isLoggedIn(): boolean { 
    return !!localStorage.getItem(this.storageKey); 
  }

  currentUser(): users | null {
    const raw = localStorage.getItem(this.storageKey);
    return raw ? JSON.parse(raw) : null;
  }
}
