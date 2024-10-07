import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { TaskMgmt } from '../models/task-mgmt.model';

@Injectable({
  providedIn: 'root'
})
export class TaskMgmtService {
  private apiUrl = "http://localhost:8080/api/tasks"; 
  constructor(private http: HttpClient) {}

  // Get tasks for a specific project
  getTasksByProject(projectId: number): Observable<TaskMgmt[]> {
    return this.http.get<TaskMgmt[]>(`${this.apiUrl}/project/${projectId}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Create a new task
  createTask(task: TaskMgmt): Observable<TaskMgmt> {
    return this.http.post<TaskMgmt>(this.apiUrl, task)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Update an existing task
  updateTask(task: TaskMgmt): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${task.taskId}`, task)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Delete a task by its ID
  deleteTask(taskId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${taskId}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Error handling method
  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
}
