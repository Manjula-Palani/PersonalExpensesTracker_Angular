import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Transaction } from '../InterfaceFolder/transaction';

@Injectable({
  providedIn: 'root'
})
export class TransactionsService {
  // private apiUrl = 'http://localhost:3000/transactions';

  // constructor(private http: HttpClient) {}

  // list(userId?: number){
  //   let params = {} as any;
  //   console.log(userId);
  //   if (userId) {
  //     params = { params: new HttpParams().set('userId', String(userId)) };
  //     console.log(params);
  //   }
  //   return this.http.get(this.apiUrl, params);
  // }

  // listAll() {
  //   return this.http.get<any[]>(this.apiUrl);
  // }
  

  // create(payload:any){ 
  //   return this.http.post(this.apiUrl, payload); 
  // }

  // update(id:number | string, payload:any){ 
  //   return this.http.put(`${this.apiUrl}/${id}`, payload); 
  // }

  // delete(id:number){ 
  //   return this.http.delete(`${this.apiUrl}/${id}`); 
  // }


  private baseUrl = 'http://localhost:3000/transactions';

  constructor(private http: HttpClient) {}

  listByUser(userId: string): Observable<Transaction[]> {
    const params = new HttpParams().set('userId', userId);
    return this.http.get<Transaction[]>(this.baseUrl, { params });
  }

  get(id: string): Observable<Transaction> { 
    return this.http.get<Transaction>(`${this.baseUrl}/${id}`); 
  }

  create(tx: Omit<Transaction,'id'>): Observable<Transaction> { 
    return  this.http.post<Transaction>(this.baseUrl, tx); 
  }

  update(id: string, tx: Partial<Transaction>): Observable<Transaction> {
    return this.http.put<Transaction>(`${this.baseUrl}/${id}`, tx); 
  }

  remove(id: string): Observable<void> { 
    return this.http.delete<void>(`${this.baseUrl}/${id}`); 
  }
}
