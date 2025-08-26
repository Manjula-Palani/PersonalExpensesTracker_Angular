import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { users } from '../InterfaceFolder/userInterface';
import { userrole } from '../EnumFolder/role';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private baseUrl = 'http://localhost:3000/users';

  constructor(private http: HttpClient) {}

  list(): Observable<users[]> { 
    return this.http.get<users[]>(this.baseUrl); 
  }

  listUsersOnly(): Observable<users[]> { 
    const params = new HttpParams().set('role', userrole.user);
    return this.http.get<users[]>(this.baseUrl, { params }); 
  }

  get(id: string): Observable<users> { 
    return this.http.get<users>(`${this.baseUrl}/${id}`);
  }

  addUser(user:users){
    return this.http.post<users>(this.baseUrl,user);
  }
}
