import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { UserManagementDomain } from './model/UserManagementDomain';


@Injectable({
  providedIn: 'root'
})
 export class UserserviceService {

  // private apiUrl = 'assets/users.json';
  private apiUrl = 'http://localhost:8080/api/users'; 
  searchTerm:any ='';
  searchSubject = new Subject();

  constructor(private http: HttpClient) { }

     getUsers(): Observable<UserManagementDomain[]> {
      return this.http.get<UserManagementDomain[]>(this.apiUrl).pipe(
        catchError(this.errorHandler));
    }
    private errorHandler(error: HttpErrorResponse) {
      
      console.error('An error occurred:', error.message);
      return throwError(error.message || 'Server Error');
    }

    getSearchString(searchTerm:any){
      this.searchTerm = searchTerm;
      this.searchSubject.next(this.searchTerm);
    }

 //anu edit fuctionality
 updateUser(id: number, userData: UserManagementDomain): Observable<UserManagementDomain> {
  return this.http.put<UserManagementDomain>(`http://localhost:8080/api/users/${id}`, userData);
}  

//anu code
getUserById(id: number): Observable<UserManagementDomain> {
return this.http.get<UserManagementDomain>(`${this.apiUrl}/${id}`).pipe(
  catchError(this.errorHandler)
);
}
/*
checkUsernameExists(username: string): Observable<boolean> {
  const url = `${this.apiUrl}/check-username?username=${encodeURIComponent(username)}`;
  console.log('Request URL:', url); // Log the URL being sent to the backend
  return this.http.get<boolean>(url).pipe(
    catchError(this.errorHandler)
  );
}


  // Check if phone number exists
  checkPhoneExists(phone: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.apiUrl}/check-phone?phone=${phone}`);
  } */

 /* // Check if username exists
  checkUsernameExists(username: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.apiUrl}/check-username?username=${username}`)
      .pipe(
        catchError(this.errorHandler)
      );
  }
  */
  checkUsernameExists(username: string): Observable<boolean> {
    const url = `${this.apiUrl}/check-username?username=${encodeURIComponent(username)}`;
    console.log('Request URL:', url); // Log the URL being sent to the backend
    return this.http.get<boolean>(url).pipe(
      catchError(this.errorHandler)
    );
  }
  
  checkPhoneExists(phone: string): Observable<boolean> {
    const url = `${this.apiUrl}/check-phone?phone=${encodeURIComponent(phone)}`;
    console.log('Request URL:', url);  // Log the URL for debugging
    return this.http.get<boolean>(url).pipe(
      catchError(this.errorHandler)
    );
  }
  
//added by anu
createUser(user: UserManagementDomain): Observable<UserManagementDomain> {
  return this.http.post<UserManagementDomain>(`${this.apiUrl}`, user).pipe(
    catchError(error => {
      console.error('Error creating user', error);
      return throwError(error);
    })
  );
}

  






}
 // private apiUrl = 'http://localhost:8080/api/users/searchUserByName'; 

  // searchUsersByName(userName: string): Observable<UserManagementDomain[]> {
  //   return this.http.get<UserManagementDomain[]>(`${this.apiUrl}/search?userName=${userName}`);
  // }
//}
