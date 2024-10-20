import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Task } from '../../project-task-management/model/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskManagementService {
  private apiUrl = "http://localhost:8080/api/tasks"; 
  constructor(private http: HttpClient) {}

  // Get tasks for a specific project
  
  getTasks(projectId: number): Observable<Task[]> {
    console.log("ProjectId:"+projectId);
    console.log(`${this.apiUrl}/project/${projectId}`);
    return this.http.get<Task[]>(`${this.apiUrl}/project/${projectId}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Create a new task
  createTask(task: Task): Observable<Task> {
    console.log("Inside Create Task");
    console.log("task.sprint:"+`$task.sprintId`);
    return this.http.post<Task>(this.apiUrl, task)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Update an existing task
  updateTask(task: Task): Observable<void> {
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
