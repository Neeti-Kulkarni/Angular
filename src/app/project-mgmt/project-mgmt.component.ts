import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProjectMgmtService } from './services/project-mgmt.service';
import { Project } from './models/project';
import { Router } from '@angular/router';

@Component({
  selector: 'app-project-mgmt',
  templateUrl: './project-mgmt.component.html',
  styleUrls: ['./project-mgmt.component.css'] // Make sure styleUrls is plural
})
export class ProjectMgmtComponent implements OnInit {
  createProjectForm: FormGroup;
  projects: Project[] = [];

  constructor(
    private fb: FormBuilder,
    private projectService: ProjectMgmtService,
    private router: Router
  ) {
    this.createProjectForm = this.fb.group({
      projectName: ['', Validators.required],
      assignedTo: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      status: ['', Validators.required],
      description: ['']
    });
  }

  ngOnInit(): void {
    this.loadProjects(); // Load the list of projects when the component is initialized
  }

  loadProjects(): void {
    this.projectService.getProjects().subscribe((data) => {
      this.projects = data;
    });
  }

  onCreateProject(): void {
    if (this.createProjectForm.valid) {
      this.projectService.createProject(this.createProjectForm.value).subscribe(
        () => {
          this.loadProjects(); // Reload project list after creation
          this.createProjectForm.reset(); // Reset the form after successful project creation
        },
        (err) => {
          console.error('Error creating project', err);
        }
      );
    }
  }

  // Ensure that manageTasks method is correctly defined here
  manageTasks(projectId: number): void {
    // Navigate to the task management route with the given projectId
    this.router.navigate(['/task-mgmt', projectId]);
  }
  
}
