import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const AUTH_API = 'http://localhost:8081/api/auth/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor(private http: HttpClient) { }
  login(credentials): Observable<any> {
    return this.http.post(AUTH_API + 'signin', {
      email: credentials.email,
      password: credentials.password
    }, httpOptions);
  }

  register(manager): Observable<any> {
    return this.http.post(AUTH_API + 'signup', {
      email: manager.email,
      password: manager.password,
      firstname: manager.firstname,
      lastname: manager.lastname,
      address: manager.address,
      company: manager.company,
      dateofBirth: manager.dateofBirth
    }, httpOptions);
  }
}
