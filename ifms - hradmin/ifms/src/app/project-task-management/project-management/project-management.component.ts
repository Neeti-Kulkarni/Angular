

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProjectManagementService } from '../services/project-management.service';

import { Task } from '../model/task.model';
import { TaskManagementService } from '../services/task-management.service';

import { catchError } from 'rxjs/internal/operators/catchError';
import { Observable, of, tap } from 'rxjs';
import { UserManagementDomain } from '../../model/UserManagementDomain';

import { Project, ProjectStatus } from '../model/project.model';
import { SprintManagementService } from '../services/sprint-management.service';
import { SprintManagementComponent } from '../sprint-management/sprint-management.component';
import { Sprint } from '../model/sprint.model';
import { UserserviceService } from '../../services/userservice.service';

@Component({
  selector: 'app-project-management',
  templateUrl: './project-management.component.html',
  styleUrls: ['./project-management.component.css'],
})
export class ProjectManagementComponent implements OnInit {
openTaskList(arg0: any) {
throw new Error('Method not implemented.');
}

  refreshProjects() {
    
    this.getProjects(); 
    this.snackBar.open('Refreshed Project List', 'Close', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: ['snackbar-success'], // Optional: Custom styling
    });
  }
//[x: string]: any;
  createProjectForm!: FormGroup;
  updateProjectForm!: FormGroup;

  users: UserManagementDomain[] = [];
  selectedUserNames: string[] = []; // Array to hold selected user names
  projects: any[] = [];
  tasks: any[] = [];
  sprints: any[] = [];
  assignedUserIds: any[] = [];
  assignedUserNames: any[] = [];
  sprintIds: any[]=[];
  sprintNames: any[]=[];
  projectStatuses = Object.values(ProjectStatus);
  selectedProject: any;
  selectedProjectId: number = 0;  // Hold the selected projectId
  errorMessage: string = '';
  isLoading: boolean = false;
  showSprintForm = false; // Track whether to show sprint form
  http: any;
  router: any;
  projectId: number=0; // Define projectId here
  filteredSprints: Sprint[] = []; // Array to hold sprints filtered by selected project
  isEditMode = false;

  
constructor(
  private fb: FormBuilder,
  private projectService: ProjectManagementService,
  private sprintService: SprintManagementService, // Inject your sprint service
 private taskService: TaskManagementService,
 private userService: UserserviceService,
 private dialog: MatDialog,
 private snackBar: MatSnackBar
) {}
ngOnInit(): void {
  this.createProjectForm = this.fb.group({
    projectName: ['', Validators.required],
    //assignedTo: ['', Validators.required],
    startDate: ['', Validators.required],
    endDate: ['', Validators.required],
    status: [ProjectStatus.NOT_STARTED], // Set a default value if needed
    assignedUserIds:[[]],

    description: [''],
    
  });
  this.updateProjectForm = this.fb.group({
    projectName: ['', Validators.required],
    //assignedUserIds: [[], Validators.required],
    assignedUserIds: [[], { validators: Validators.required, updateOn: 'change' }], 
    startDate: ['', Validators.required],
    endDate: ['', Validators.required],
    description: [''],
    status:[ProjectStatus.IN_PROGRESS]
  });
  this.loadProjectManagers();
  this.getProjects();
 
  
  // Subscribe to changes on assignedUserIds control
  this.createProjectForm.get('assignedUserIds')?.valueChanges.subscribe(selectedIds => {
  if (selectedIds) { // Ensure selectedIds is not null
      this.updateSelectedUserNames(selectedIds);
  } else {
      this.selectedUserNames = []; // Reset if selectedIds is null
  }
  }); 
  //this.fetchSprints();
}
  
onCreateProject() {
  console.log("inside onCreateProject");
  console.log(this.createProjectForm.valid);
  if (this.createProjectForm.valid) {
    console.log("isLoading:"+this.isLoading);
    this.isLoading = true;
    const projectData = {
      ...this.createProjectForm.value,
      status: this.createProjectForm.value.status // Ensure status is included
  };
    this.projectService.createProject(projectData).subscribe(
      (response) => {
        this.getProjects();  // Refresh the project list
        console.log("Fetched Projects:"+this.getProjects());
        this.createProjectForm.reset();
        this.isLoading = false;
        this.snackBar.open('Project Created Successfully!', 'Close', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
        });
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

getProjects() {
  this.isLoading = true;

  this.projectService.getProjects().subscribe(
    (projects: Project[]) => {
      console.log('Fetched Projects:', projects); // Verify project data here
      
      this.projects = projects.map((project: Project) => {
        // Map assigned user IDs to user names
        console.log("project.assignedUserIds:", project.assignedUserIds);

        // Check if assignedUserIds is not null or undefined
        project.assignedUserNames = (project.assignedUserIds ?? [])
          .map((id: number) => this.users.find(user => user.userId === id)?.userName)
          .filter((name): name is string => Boolean(name)); // Type guard to keep only strings

        console.log("project.assignedUserNames:", project.assignedUserNames);

        // Add default sprint to the project
        project.sprintIds = [...(project.sprintIds ?? [])];
        project.sprintNames = [...(project.sprintNames ?? [])];

        // Optionally, you can also attach the default sprint object to the project
        //project.defaultSprint = defaultSprint;
        console.log("Before returing from getProjects():"+JSON.stringify(project,null,2));
        return project;
      });

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
// Update selected user names based on selected IDs
updateSelectedUserNames(selectedIds: number[]): void {
  console.log("SelectedIds:"+selectedIds);
  if (selectedIds) { // Check if selectedIds is defined
        this.selectedUserNames = this.users
            .filter(user => selectedIds.includes(user.userId))
            .map(user => `${user.userId} - ${user.userName}`);
            console.log("Updated User Names:", this.selectedUserNames);
    } else {
        this.selectedUserNames = []; // Reset if selectedIds is null or undefined
    }
}

 //for Updating Project
 /*
 editProject(project: any) {
  this.isEditMode = true;
  this.selectedProject = project;

  this.updateProjectForm.patchValue({
    projectName: project.projectName,
    assignedUserIds: project.assignedUserIds,
    startDate: project.startDate,
    endDate: project.endDate,
    description: project.description,
  });
}*/
editProject(project: any) {
  if (!this.updateProjectForm) {
    console.error('Form is not initialized');
    return;
  }
  console.log('Project Data:', project);
  this.isEditMode = true;
  this.selectedProject = project;
  console.log('Assigned User IDs:', project.assignedUserIds); // Debug log 
  this.updateProjectForm.get('assignedUserIds')?.valueChanges.subscribe(value => {
    console.log('Selected User IDs (Real-time):', value);
  }); 
  this.updateProjectForm.patchValue({
    projectName: project.projectName,
    assignedUserIds: this.updateProjectForm.get('assignedUserIds'),
    startDate: project.startDate,
    endDate: project.endDate,
    description: project.description
  });
  // Update the selected user names for display
  this.updateSelectedUserNames(project.assignedUserIds || []);
}
/*
onUpdateProject() {
  const updatedProject = this.updateProjectForm.value;
  const projectId = this.selectedProject.projectId;
console.log(projectId);
  this.projectService
    .updateProject(projectId, updatedProject)
    .subscribe(() => {
      this.isEditMode = false;
      this.getProjects(); // reload the projects list after update
    });
}
*/
onUpdateProject() {
  console.log(this.selectedProject);
  if (!this.selectedProject) {
    console.error("No project selected for update.");
    return; // Prevent further execution if `selectedProject` is undefined
  }

  const updatedProjectData = this.updateProjectForm.value;
    // Update the selected project with the new user IDs
  this.selectedProject.assignedUserIds = updatedProjectData.assignedUserIds;
   // Update the selected user names for display
   //this.updateSelectedUserNames(this.selectedProject.assignedUserIds || []);
  // Map assignedUserIds to assignedUserNames with explicit type for 'id'
  this.selectedProject.assignedUserNames = this.selectedProject.assignedUserIds.map((id: number) => this.users[id]);
   console.log("Inside OnUpdateProject:"+this.selectedProject.assignedUserIds);
 // Optional: Log to check if the mapping works
 console.log("Assigned User Names:", this.selectedProject.assignedUserNames);
  // Call the update service with the selected project's ID and new data
  this.projectService.updateProject(this.selectedProject.projectId, updatedProjectData)
    .subscribe(
      (response) => {
        console.log("Project updated successfully", response);
        this.isEditMode = false; // Exit edit mode
        this.selectedProject = null; // Clear the selected project
        //this.refreshProjects(); // Optionally refresh the list of projects
      },
      (error) => {
        console.error("Error updating project", error);
      }
    );
}
/*
onUpdateProject() {
  console.log(this.selectedProject);
  if (!this.selectedProject) {
    console.error("No project selected for update.");
    return; // Prevent further execution if `selectedProject` is undefined
  }

  const updatedProjectData = this.updateProjectForm.value;

  // Update user names before calling the update service
  this.getUserNamesByIds(updatedProjectData.assignedUserIds);

  // Continue with the project update logic
  this.projectService.updateProject(this.selectedProject.projectId, updatedProjectData)
    .subscribe(
      (response) => {
        console.log("Project updated successfully", response);
        this.isEditMode = false;
        this.selectedProject = null;
      },
      (error) => console.error("Error updating project", error)
    );
}

getUserNamesByIds(userIds: number[]): void {
  this.userService.getUsers().subscribe((users: UserManagementDomain[]) => {
    const userNames = users
      .filter(user => userIds.includes(user.userId))
      .map(user => user.userName);

    // Now, patch the user names to the form or update the selected project
    this.updateProjectForm.patchValue({
      assignedUserNames: userNames
    }, { emitEvent: false });

    console.log('User Names:', userNames);
  }, (error) => {
    console.error('Error fetching users', error);
  });
}*/

loadTasks(projectId: number): Observable<Task[]> {
  return this.taskService.getTasks(projectId).pipe(
    tap((tasks: Task[]) => {
      console.log('Fetched tasks:', tasks); // Log the fetched tasks
      const project = this.projects.find(p => p.projectId === projectId);
      if (project) {
        project.tasks = tasks; // Assign tasks to the project
        console.log('Tasks assigned to project:', project.projectName);
      } else {
        console.warn(`Project with ID ${projectId} not found.`);
      }
    }),
    catchError((error) => {
      console.error('Error loading tasks:', error);
      return of([]); // Return an empty array if the request fails
    })
  );
}


viewTasks(project: any) {
  if (this.selectedProject === project) {
    // Deselect the project if already selected
    this.selectedProject = null;
  } else {
    // Set the selected project and ensure tasks are loaded
    this.selectedProject = project;

    // Optional: Fetch tasks dynamically if not already loaded
    if (!project.tasks) {
      project.isLoading = true;
      this.loadTasks(project.projectId).subscribe((tasks) => {
        project.tasks = tasks; // Assign tasks to the project
        project.isLoading = false;
      });
    }
  }
}
/* Delete project
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
}*/

onTaskCreated(newTask: Task): void {
  if (this.selectedProject) {
    // Check if tasks property exists
    if (!this.selectedProject.tasks) {
      this.selectedProject.tasks = [];
    }
    console.log('New Task Created:', newTask);
    // Add the new task to the tasks array
    this.selectedProject.tasks.push(newTask);
    this.viewTasks(this.selectedProject);  // Reload tasks after creation
  }
}

 // Handle Sprint Creation Event
 onSprintCreated(sprintData: any): void {
  if (this.selectedProject) {
    const sprint = { ...sprintData, projectId: this.selectedProject.projectId };
    console.log('Sprint created:', sprint);
    this.sprints.push(sprint); // Add sprint to the list
  }
}
/*
openSprintDialog(): void {
  const dialogRef = this.dialog.open(SprintManagementComponent, {
    width: '400px',
  });

  // Handle the dialog result
  dialogRef.afterClosed().subscribe((sprintData) => {
    if (sprintData) {
      this.onSprintCreated(sprintData); // Handle the sprint creation
    }
  });
}*/

openSprintDialog(project: { projectId: number; projectName: string }): void {
  console.log('Selected Project:', project);

  if (!project) {
    console.error('No project selected.');
    return;
  }

  const dialogRef = this.dialog.open(SprintManagementComponent, {
    width: '400px',
    data: {
      projectId: project.projectId,
      projectName: project.projectName,
    },
  });

  dialogRef.afterClosed().subscribe(result => {
    console.log('Dialog closed:', result);
    if (result) {
     
        this.onSprintCreated(result); // Handle the sprint creation
      
      // Handle the returned result, e.g., refresh the data or notify user
      console.log('Sprint data:', result);
    } else {
      console.log('No data returned from dialog.');
    }
  });
}

onTaskUpdated(): void {
  if (this.selectedProject) {
    this.taskService.getTasks(this.selectedProject.projectId).subscribe((tasks) => {
      this.selectedProject!.tasks = tasks;
    });
  }
}

onTaskDeleted(taskId: number): void {
  this.taskService.deleteTask(taskId).subscribe(() => {
    this.onTaskUpdated();  // Reload tasks after deletion
  });
}
cancelEdit() {
  this.isEditMode = false;
}



// Load project managers on component initialization
loadProjectManagers(): void {
  this.userService.getProjectManagers().subscribe(
    (data) => { 
      this.users = data;
      console.log('Project Managers:', this.users); // This will log the entire array of project managers
      console.log('Project Managers:', this.users);
    },
    (error) => {
      console.error('Error fetching project managers', error);
    }
  );
}
/*
loadSprints() {
  this.projectService.getSprints().subscribe((data) => (this.sprints = data));
}*/

 // Method to load sprints for the selected project
 loadSprints(): void {
  if (this.selectedProject?.projectId) {
    this.sprintService.getSprintsByProject(this.selectedProject.projectId).subscribe(
      (sprints) => {
        this.sprints = sprints;
        console.log('Sprints loaded:', sprints);
      },
      (error) => {
        console.error('Failed to load sprints', error);
        this.snackBar.open('Failed to load sprints!', 'Close', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
        });
      }
    );
  }
}

}

