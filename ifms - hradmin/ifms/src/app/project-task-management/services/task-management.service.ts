import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { Task } from '../../project-task-management/model/task.model';
import { Project } from '../model/project.model';
import { Sprint } from '../model/sprint.model';

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
    if(projectId!=null){
    return this.http.get<Task[]>(`${this.apiUrl}/project/${projectId}`)
      .pipe(
        catchError(this.handleError)
      );
    }
    else{
      return of([]);
    }
  }

  getProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(`${this.apiUrl}/projects`).pipe(
      tap((projects) => console.log('Projects received from API:', projects)), // Debugging statement
      catchError((error) => {
        console.error('Error fetching projects:', error); // Debugging error
        return of([]); // Return an empty array on error to prevent crashes
      })
    );
  }

   // Method to fetch all sprints
   getSprints(): Observable<Sprint[]> {
    return this.http.get<Sprint[]>(`${this.apiUrl}/sprints`);
  }
  // Create a new task
  createTask(task: Task): Observable<Task> {
    console.log("Inside Create Task");
    console.log("task: " + JSON.stringify(task, null, 2)); // Log newTask as JSON
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