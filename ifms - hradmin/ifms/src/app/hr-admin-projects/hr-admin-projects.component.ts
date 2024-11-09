import { Component, OnInit } from '@angular/core';
import { ProjectManagementService } from '../project-task-management/services/project-management.service';
import { Project, ProjectStatus } from '../project-task-management/model/project.model'; // Import the project model if needed
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-hr-admin-projects',
  templateUrl: './hr-admin-projects.component.html',
  styleUrl: './hr-admin-projects.component.css',
})
export class HrAdminProjectsComponent implements OnInit {
  myForm!: FormGroup;
  projects: Project[] = []; // Array to hold project data
  projectStatuses = Object.values(ProjectStatus);

  constructor(
    private projectService: ProjectManagementService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {this.myForm = this.fb.group({
    projectName: ['', Validators.required],
    //assignedTo: ['', Validators.required],
    startDate: ['', Validators.required],
    endDate: ['', Validators.required],
    status: [ProjectStatus.NOT_STARTED], // Set a default value if needed
    assignedUserIds:[[]],
    description: [''],
     });

    
  }

  fetchProjects(): void {
    this.projectService.getProjects().subscribe(
      (data: Project[]) => {
        this.projects = data;
        console.log('Projects fetched:', this.projects);
      },
      (error) => {
        console.error('Error fetching projects:', error);
      }
    );
  }

  createProject(newProject: Project): void {
    this.projectService.createProject(newProject).subscribe(
      (response: Project) => {
        console.log('Project created:', response);
        this.projects.push(response); // Optionally update the project list
      },
      (error) => {
        console.error('Error creating project:', error);
      }
    );
  } 
  
  onSubmit(): void {
    if (this.myForm.valid) {
      const newProject: Project = this.myForm.value;
      console.log('Form Submitted:', newProject);
      this.createProject(newProject);
    } else {
      console.log('Form is invalid');
    }
  }
}
