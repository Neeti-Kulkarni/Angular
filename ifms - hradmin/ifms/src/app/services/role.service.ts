import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RoleManagementDTO } from '../model/role-management-dto';

@Injectable({
  providedIn: 'root',
})
export class RoleService {

  private apiUrl = 'http://localhost:8080/api/roles'; // Adjust the URL based on your API endpoint

  constructor(private http: HttpClient) {}

  // Method to fetch all roles
  getRoles(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}
