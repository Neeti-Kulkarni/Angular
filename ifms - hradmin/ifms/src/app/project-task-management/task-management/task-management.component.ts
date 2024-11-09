import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, Observable, of } from 'rxjs';
import { TaskManagementService } from '../services/task-management.service';
import { Task } from '../model/task.model';
import { Project } from '../model/project.model'; // Assume you have a Project model
import { Sprint } from '../model/sprint.model'; // Assume you have a Sprint model

@Component({
  selector: 'app-task-management',
  templateUrl: './task-management.component.html',
  styleUrls: ['./task-management.component.css']
})
export class TaskManagementComponent implements OnInit {
  @Input() projectId!: number;
  @Input() tasks: Task[] = [];
  @Output() taskCreated = new EventEmitter<Task>();
  @Output() taskUpdated = new EventEmitter<void>();
  @Output() taskDeleted = new EventEmitter<number>();

  createTaskForm: FormGroup;
  editTaskForm: FormGroup;
  selectedTask: Task | null = null;
  showEditModal: boolean = false;
  showCreateTaskForm: boolean = true;

  priorities = ['Low', 'Medium', 'High'];
  taskStatuses = ['Pending', 'In Progress', 'Completed'];
  projects: Project[] = []; // To hold projects
  sprints: Sprint[] = []; // To hold sprints
  filteredSprints: Sprint[] = [] // To hold Filtered array of Sprints based on selected Project

  constructor(
    private fb: FormBuilder,
    private taskService: TaskManagementService,
    private snackBar: MatSnackBar
  ) {
    this.createTaskForm = this.fb.group({
      taskName: ['', Validators.required],
      description: [''],
      priority: ['', Validators.required],
      status: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      assignedToUserName: [''],
      projectId: [0, Validators.required], // Add projectId
      sprintId: ['', Validators.required] // Add sprintId
    });

    this.editTaskForm = this.fb.group({
      taskName: ['', Validators.required],
      description: [''],
      priority: ['', Validators.required],
      status: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      assignedToUserName: [''],
      projectId: [0, Validators.required], // Add projectId
      sprintId: ['', Validators.required] // Add sprintId
    });
  }

  ngOnInit(): void {
    this.showCreateTaskForm = true;
    
    
    this.loadTasksForProject(this.projectId).subscribe((tasks) => {
      this.tasks = tasks;

    });
    
    if((this.loadProjects())!=null)
      this.loadProjects(); // Load projects on initialization
    if((this.loadSprints()!=null))
    this.loadSprints(); // Load sprints on initialization
  this.onProjectChange();
  }

  loadTasksForProject(projectId: number): Observable<Task[]> {
    if (projectId != 0) {
      return this.taskService.getTasks(projectId).pipe(
        catchError((error) => {
          this.showMessage('Error loading tasks', 'Close');
          console.error('Error loading tasks:', error);
          return of([]);
        })
      );
    } else {
      return of([]);
    }
  }
/*
  loadProjects(): void {
    this.taskService.getProjects().subscribe((projects: Project[]) => {
      this.projects = projects;
    }, error => {
      this.showMessage('Error loading projects', 'Close');
      console.error('Error loading projects:', error);
    });
  }
*/
/*
onProjectChange() {
  this.createTaskForm.get('projectId')?.valueChanges.subscribe((projectId) => {
    console.log("Selected Project ID:", projectId); // Log selected project ID
    console.log("All Sprints Before Filtering:", this.sprints); // Log all sprints before filtering
    
    // Filter sprints based on selected project ID
    this.filteredSprints = this.sprints.filter((sprint) => sprint.projectId === projectId);

    console.log("Filtered Sprints:", this.filteredSprints); // Log filtered sprints

    // Reset sprint selection when project changes
    this.createTaskForm.get('sprintId')?.setValue('');
  });
}*/
onProjectChange() {
  this.createTaskForm.get('projectId')?.valueChanges.subscribe((projectId) => {
    console.log("Selected Project ID:", projectId); // Log selected project ID

    // Ensure projectId is a number
    const selectedProjectId = Number(projectId);
    console.log("Converted Selected Project ID:", selectedProjectId); // Log converted ID

    console.log("All Sprints Before Filtering:", this.sprints);

    // Filter sprints based on selected project ID
    this.filteredSprints = this.sprints.filter((sprint) => {
      console.log("Checking sprint ID:", sprint.projectId); // Log each sprint's project ID
      return sprint.projectId === selectedProjectId; // Compare with selected project ID
    });

    console.log("Filtered Sprints:", this.filteredSprints); // Log filtered sprints

    // Reset sprint selection when project changes
    this.createTaskForm.get('sprintId')?.setValue('');
  });
}

loadProjects(): void {
  this.taskService.getProjects().subscribe(
    (projects: Project[]) => {
      // Null check and validation
      if (!projects || !Array.isArray(projects)) {
        this.showMessage('Invalid project data received', 'Close');
        console.error('Invalid project data:', projects);
        return;
      }

      if (projects.length === 0) {
        this.showMessage('No projects available', 'Close');
      } else {
        this.projects = projects;
      }
    },
    error => {
      this.showMessage('Error loading projects', 'Close');
      console.error('Error loading projects:', error);
    }
  );
}

  loadSprints(): void {
    this.taskService.getSprints().subscribe(
      (sprints: Sprint[]) => {
        if (!sprints || !Array.isArray(sprints)) {
          this.showMessage('Invalid sprint data received', 'Close');
          console.error('Invalid sprint data:', sprints);
          return;
        }
  
        if (sprints.length === 0) {
          this.showMessage('No sprints available', 'Close');
        } else {
          this.sprints = sprints;
        }
      },
      error => {
        this.showMessage('Error loading sprints', 'Close');
        console.error('Error loading sprints:', error);
      }
    );
  }

  onCreateTask() {
    console.log("this.createTaskForm.valid:"+this.createTaskForm.valid);
    if (this.createTaskForm.valid) {
      const projectId = this.createTaskForm.value.projectId;  
      console.log(projectId);
      if (!projectId) {
        this.showMessage('Please select a project before creating a task.', 'Close');
        return; // Prevent task creation if projectId is null
      }
      const newTask: Task = { 
        ...this.createTaskForm.value,
        projectId: this.createTaskForm.value.projectId,
        startDate: new Date(this.createTaskForm.value.startDate),
        endDate: new Date(this.createTaskForm.value.endDate)
      };
      console.log("newTask: " + JSON.stringify(newTask, null, 2)); // Log newTask as JSON
      this.taskService.createTask(newTask).subscribe(() => {
        this.tasks.push(newTask);
        this.createTaskForm.reset();
        this.taskCreated.emit(newTask);
        this.showMessage('Task created successfully!', 'Close');
      });
    }
  }

  editTask(task: Task) {
    this.selectedTask = task;
    this.showEditModal = true;
    this.editTaskForm.patchValue({
      ...task, // Patches the form with the task details
      projectId: task.projectId,
      sprintId: task.sprintId
    });
  }

  onEditTask() {
    if (this.selectedTask && this.editTaskForm.valid) {
      const updatedTask = {
        ...this.selectedTask,
        ...this.editTaskForm.value,
        startDate: new Date(this.editTaskForm.value.startDate),
        endDate: new Date(this.editTaskForm.value.endDate)
      };

      this.taskService.updateTask(updatedTask).subscribe(() => {
        const index = this.tasks.findIndex(task => task.taskId === updatedTask.taskId);
        this.tasks[index] = updatedTask;
        this.showEditModal = false;
        this.taskUpdated.emit();
        this.showMessage('Task updated successfully!', 'Close');
      });
    }
  }

  onDeleteTask(taskId: number) {
    this.taskService.deleteTask(taskId).subscribe(() => {
      this.tasks = this.tasks.filter(task => task.taskId !== taskId);
      this.taskDeleted.emit(taskId);
      this.showMessage('Task deleted successfully!', 'Close');
    }, (error) => {
      console.error('Error deleting task:', error);
      this.showMessage('Error deleting task', 'Close');
    });
  }

  closeEditModal() {
    this.showEditModal = false;
    this.selectedTask = null;
  }

  toggleCreateTaskForm() {
    this.showCreateTaskForm = !this.showCreateTaskForm;
  }

  private showMessage(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000
    });
  }
}
