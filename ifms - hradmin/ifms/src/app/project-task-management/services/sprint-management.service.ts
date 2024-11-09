// sprint.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Sprint } from '../model/sprint.model';

@Injectable({
  providedIn: 'root'
})
export class SprintManagementService {
  private apiUrl = 'http://localhost:8080/api/sprints'; // Adjust as needed

  constructor(private http: HttpClient) {}
/*
  getSprintsByProject(projectId: number): Observable<Sprint[]> {
   
    return this.http.get<Sprint[]>(`${this.apiUrl}/project/${projectId}`);
  }
*/
getSprintsByProject(projectId: number): Observable<Sprint[]> {
  return this.http.get<Sprint[]>(`${this.apiUrl}/project/${projectId}`)
    .pipe(
      tap((sprint: any) => console.log('Sprints:', sprint)) // Log the data
    );
}

  createSprint(sprint: Sprint): Observable<Sprint> {
    console.log("Sprints: " + JSON.stringify(sprint, null, 2)); // Pretty-print with 2-space indentation
    return this.http.post<Sprint>(this.apiUrl, sprint);
  }

  updateSprint(sprint: Sprint): Observable<Sprint> {
    console.log("Sprints: " + JSON.stringify(sprint, null, 2)); // Pretty-print with 2-space indentation
    console.log(`${this.apiUrl}/${sprint.sprintId}`);
    return this.http.put<Sprint>(`${this.apiUrl}/${sprint.sprintId}`, sprint);
  }

  deleteSprint(sprintId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${sprintId}`);
  }

  checkSprintExists(sprintName: string, sprintNo: number): Observable<{ nameExists: boolean; numberExists: boolean }> {
    // Call the backend API to check for existing sprint
    return this.http.get<{ nameExists: boolean; numberExists: boolean }>(
      `${this.apiUrl}/check?name=${sprintName}&number=${sprintNo}`
    );
  }
}
