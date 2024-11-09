import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserLoginManagementDomain } from './model/UserLoginManagementDomin';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  //private usersUrl = 'assets/loginusers.json';
  private usersUrl = 'http://localhost:8080/api/auth';
  //private usersUrl = 'http://localhost:8080/api/auth/login'; 

  constructor(private http: HttpClient) {}

  // login(usernameOrEmail: string, password: any): Observable<any> {
  //   return this.http.post(this.usersUrl, { usernameOrEmail, password });
  // }

  getUsers(): Observable<UserLoginManagementDomain[]> {
    return this.http.get<UserLoginManagementDomain[]>(this.usersUrl);
   }

   login(usernameOrEmail: string, password: string): Observable<any> {
     return this.getUsers().pipe(
       map(users => users.find(u => u.usernameOrEmail === usernameOrEmail && u.password === password))
      );
  }
}

// login(usernameOrEmail: string, password: string): Observable<any> {
 // const body = { usernameOrEmail, password };
  //return this.http.post(`${this.apiUrl}/login`, body);
//}