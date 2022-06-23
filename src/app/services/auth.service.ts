import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TypeLogin, TypeLoginResponse, TypeSignupType } from '../types/Auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient
  ) { }

  login(data: TypeLogin): Observable<TypeLoginResponse> {
    return this.http.post<TypeLoginResponse>(`${environment.login}`, data);
  }
  signup(data: TypeSignupType): Observable<TypeSignupType> {
    return this.http.post<TypeSignupType>(`${environment.signup}`, data);
  }
}
