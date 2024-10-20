
/*
@Component({
  selector: 'app-project-management',
  templateUrl: './project-management.component.html',
  styleUrl: './project-management.component.css'
})
export class ProjectManagementComponent implements OnInit {
  projects = [
    { projectId: 1,projectName: 'Project Alpha', description: 'In Progress' },
    { projectId: 2, projectName: 'Project Beta', description: 'Completed' }
  ];

  constructor() {}

  ngOnInit(): void {}
}*/
import { MatDialog } from '@angular/material/dialog';
import { Observable, of, tap } from 'rxjs';

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProjectManagementService } from '../services/project-management.service';
//import { SprintManagementService } from '../../sprint-management/services/sprint-management.service';
import { Task } from '../model/task.model';
import { TaskManagementService } from '../services/task-management.service';
import {TaskManagementComponent} from '../task-management/task-management.component'

@Component({
  selector: 'app-project-management',
  templateUrl: './project-management.component.html',
  styleUrls: ['./project-management.component.css'],
})
export class ProjectManagementComponent implements OnInit {
//[x: string]: any;
  createProjectForm!: FormGroup;
  projects: any[] = [];
  tasks: any[] = [];
  //sprints: any[] = [];
  projectStatuses = ['ON_HOLD', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED'];
  selectedProject: any;
  selectedProjectId: number = 0;  // Hold the selected projectId
  errorMessage: string = '';
  isLoading: boolean = false;
  http: any;
  router: any;
  projectId: number=0; // Define projectId here
  
constructor(
  private fb: FormBuilder,
  private projectService: ProjectManagementService,
 // private sprintService: SprintManagementService, // Inject your sprint service
 private taskService: TaskManagementService,
 private dialog: MatDialog
) {}
ngOnInit(): void {
  this.createProjectForm = this.fb.group({
    projectName: ['', Validators.required],
    assignedTo: ['', Validators.required],
    startDate: ['', Validators.required],
    endDate: ['', Validators.required],
    //status: ['', Validators.required],
    description: [''],
    //sprintIds: [[], Validators.required],
  });
  
  this.getProjects();
  //this.fetchSprints();
}
onCreateProject() {
  console.log("inside onCreateProject");
  console.log(this.createProjectForm.valid);
  if (this.createProjectForm.valid) {
    console.log("isLoading:"+this.isLoading);
    this.isLoading = true;
    const projectData = this.createProjectForm.value;
    this.projectService.createProject(projectData).subscribe(
      (response) => {
        this.getProjects();  // Refresh the project list
        console.log("Fetched Projects:"+this.getProjects());
        this.createProjectForm.reset();
        this.isLoading = false;
      },
      (error) => {
        this.errorMessage = error;
        this.isLoading = false;
      }
    );
  } else {
    this.errorMessage = 'Please fill in all required fields.';
  }
}
// Get all projects
getProjects() {
  this.isLoading = true;
  this.projectService.getProjects().subscribe(
    (data) => {
      this.projects = data;
      this.isLoading = false;
    },
    (error) => {
      this.errorMessage = error;
      this.isLoading = false;
    }
  );
}
selectProject(project: any) {
  this.selectedProject = project; // Set the selected project
  console.log('Selected Project:', this.selectedProject); // Check what project is selected
  this.projectService.getTasksByProject(project.projectId); // Load tasks for the selected project
}

// Method to load tasks for a specific project
loadTasks(projectId: number){
 return this.taskService.getTasks(projectId).subscribe((tasks: Task[]) => {
      console.log('Fetched tasks:', tasks); // Log the fetched tasks
      const project = this.projects.find(p => p.projectId === projectId);
      
      if (project) {
        console.log("True");
        project.tasks = tasks; // Assign fetched tasks to the project
      }
    },
    (error) => {
      console.error('Error loading tasks:', error);
    }
  );
}
/*viewTasks(project: any) {
  this.selectedProject = project;
  this.projectId = project.projectId;
  this.isLoading = true; // Set loading to true while fetching tasks

  this.projectService.getTasksByProject(project.projectId).subscribe(
    (data) => {
      this.tasks = data;
      console.log("Fetched Tasks:", JSON.stringify(this.tasks, null, 2));
      console.log("isLoading:" +this.isLoading);
      //this.isLoading = false; // Set loading to false once data is fetched
    },
    (error) => {
      this.errorMessage = error;
      console.error("Error fetching tasks:", error);
      this.isLoading = false; // Also set loading to false on error
    }
  );
}*/
viewTasks(project: any) {
  project.isLoading = !project.isLoading; // Toggle loading state
  if (project.isLoading) {
    // Optionally fetch or generate the task list here if needed
    this.loadTasks(project.projectId); // Example function to load tasks
  }
}
// Delete project
deleteProject(projectId: number) {
  this.isLoading = true;
  this.projectService.deleteProject(projectId).subscribe(
    (response) => {
      // On success, refresh the project list
      this.getProjects();
      this.isLoading = false;
    },
    (error) => {
      this.errorMessage = error;
      this.isLoading = false;
    }
  );
}



  


onUpdateTask(taskId: number): void {
  this.dialog.open(TaskManagementComponent, {
    width: '600px',
    data: { taskId: taskId }
  });
}
openEditTaskDialog(taskId: number): void {
  this.dialog.open(TaskManagementComponent, {
    width: '600px',
    data: { taskId: taskId, action: 'edit' }
  });
}

openDeleteTaskDialog(taskId: number): void {
  this.dialog.open(TaskManagementComponent, {
    width: '600px',
    data: { taskId: taskId, action: 'delete' }
  });
}
onDeleteTask(taskId: number): void {
  this.taskService.deleteTask(taskId).subscribe(() => {
    this.loadTasks(this.projectId); // Reload tasks after deletion
  }, error => {
    console.error('Error deleting task:', error);
  });
}
}

