import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProjectManagementService {

  private apiUrl = 'http://localhost:8080/api';  // Base URL of your backend API

  constructor(private http: HttpClient) {}

  // Headers for the request
  private getHeaders() {
    return new HttpHeaders({
      'Content-Type': 'application/json',
    });
  }

  // Get all projects
  getProjects(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/projects`, { headers: this.getHeaders() })
      .pipe(catchError(this.handleError));
  }

  // Create a new project
  createProject(projectData: any): Observable<any> {
    console.log("apiUrl:"+`${this.apiUrl}/projects`);
    return this.http.post<any>(`${this.apiUrl}/projects`, projectData, { headers: this.getHeaders() })
      .pipe(catchError(this.handleError));
  }

  // Update project
  updateProject(projectId: number, projectData: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/projects/${projectId}`, projectData, { headers: this.getHeaders() })
      .pipe(catchError(this.handleError));
  }

  // Delete project
  deleteProject(projectId: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/projects/${projectId}`, { headers: this.getHeaders() })
      .pipe(catchError(this.handleError));
  }

  // Get tasks by project ID
  getTasksByProject(projectId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/tasks/project/${projectId}`, { headers: this.getHeaders() })
      .pipe(catchError(this.handleError));
  }

  // Create a task
  createTask(taskData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/tasks`, taskData, { headers: this.getHeaders() })
      .pipe(catchError(this.handleError));
  }

  getSprints(): Observable<any> {
    return this.http.get(`${this.apiUrl}/sprints`);
  }

  // Get sprints by project ID
  getSprintsByProject(projectId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/sprints/project/${projectId}`, { headers: this.getHeaders() })
      .pipe(catchError(this.handleError));
  }

  // Create a sprint
  createSprint(sprintData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/sprints`, sprintData, { headers: this.getHeaders() })
      .pipe(catchError(this.handleError));
  }

  // Handle errors
  private handleError(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Backend errors
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }
}
