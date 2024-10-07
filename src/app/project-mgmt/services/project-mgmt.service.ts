import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Project } from '../models/project';

@Injectable({
  providedIn: 'root'
})
export class ProjectMgmtService {
  private apiUrl = "http://localhost:8080/api/projects"

    constructor(private http: HttpClient) { }

    createProject(project: Project): Observable<Project> {
        return this.http.post<Project>(`${this.apiUrl}`, project);
    }

    getProjects(): Observable<Project[]> {
        return this.http.get<Project[]>(`${this.apiUrl}`);
    }
  
}
