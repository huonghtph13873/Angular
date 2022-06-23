import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UsersCreate, UserType } from '../types/users';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }
  getuser(): Observable<UserType[]> {
    return this.http.get<UserType[]>(environment.users);
  }
  getusers(id: string): Observable<UserType> {
    return this.http.get<UserType>(`${environment.users}/${id}`);
  }
  deleteusers(id: string | number): Observable<any> {
    return this.http.delete(`${environment.users}/${id}`);
  }
  createusers(data: UsersCreate): Observable<UserType> {
    return this.http.post<UserType>(`${environment.users}`, data);
  }

  updateusers(id: number | string, data: UsersCreate): Observable<UserType> {
    return this.http.put<UserType>(`${environment.users}/${id}`, data);
  }
}
