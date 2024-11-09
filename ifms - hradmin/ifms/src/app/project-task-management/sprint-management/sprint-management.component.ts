import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SprintManagementService } from '../services/sprint-management.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';
import { SprintStatus } from '../model/sprint.model';
interface SprintDialogData {
  projectId: number;
  projectName: string;
  sprint?: any;  // Optional sprint property
}

@Component({
  selector: 'app-sprint-management',
  templateUrl: './sprint-management.component.html',
})
export class SprintManagementComponent implements OnInit {
  displayedColumns: string[] = ['sprintName', 'startDate', 'endDate', 'actions'];
  sprints: any[] = []; // Array to hold sprint data
  sprintForm!: FormGroup;
  editingSprint: boolean = false; // Flag to indicate if editing
  isDialogOpen: boolean = false; // Flag to control dialog visibility
  projectId: number; // Project ID passed from the parent component
  projectName: string; //Project Name
  sprintStatuses = Object.values(SprintStatus); // Create an array of status values
  currentSprint: any;  // Declare currentSprint here

  constructor(
    private fb: FormBuilder,
    private sprintService: SprintManagementService,
    public dialogRef: MatDialogRef<SprintManagementComponent>,private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: SprintDialogData  // Correct type for injected data
  ) {
    this.projectId = data.projectId; // Assign projectId from injected data
    this.projectName = data.projectName;
    this.initSprintForm(); // Initialize the form
  }

  ngOnInit() {
    // Check if we're editing an existing sprint or creating a new one
    this.currentSprint = this.data.sprint || null;
    this.editingSprint = !!this.currentSprint;
    this.loadSprints();
    console.log(this.sprints); // Check if the array is populated
  }

  initSprintForm(): void {
    this.sprintForm = this.fb.group({
      projectId: [this.projectId], // Add projectId to the form
      projectName: [this.data.projectName], // Add projectName to the form
      sprintName: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      sprintNo: ['', Validators.required], // Add sprintNo to the form
      status:['NEW', Validators.required]
    });
  }

  loadSprints(): void {
    console.log(this.projectId);
    this.sprintService.getSprintsByProject(this.projectId).subscribe(data => {
      this.sprints = data;
    });
    console.log(this.sprints);
  }
  startSprint(sprintId: number): void {
    // Logic to start a sprint
    console.log(`Starting sprint with ID: ${sprintId}`);
    this.snackBar.open('Sprint Started!', 'Close', { duration: 3000 });
  }
  
  openSprintDialog(sprint?: any): void {
    this.isDialogOpen = true; // Open the dialog
    this.editingSprint = !!sprint; // Set editing mode
    this.currentSprint = sprint || {};

    if (sprint) {
      // Populate the form with the sprint data for editing
      this.sprintForm.patchValue({
        sprintName: sprint.sprintNameame,
        projectId: sprint.projectId,
        projectName: sprint.projectName,
        sprintNo: sprint.sprintNo,
        startDate: sprint.startDate,
        endDate: sprint.endDate,
        status:sprint.status
      });
    } else {
      this.sprintForm.reset(); // Reset form for new sprint
    }
  }
  /*
    onSubmit(): void {
      if (this.sprintForm.valid) {
        const sprintData = {
          ...this.sprintForm.value,
          
          projectId: this.data.projectId,
        };
  
        if (this.editingSprint) {
          // Update existing sprint
          this.sprintService.updateSprint(sprintData).subscribe(
            (result) => {
              this.snackBar.open('Sprint updated successfully!', 'Close', {
                duration: 3000,
                horizontalPosition: 'center',
                verticalPosition: 'top',
              });
              this.dialogRef.close(result); // Close the dialog with updated sprint data
            },
            (error) => {
              console.error('Update failed', error);
              this.snackBar.open('Failed to update sprint!', 'Close', {
                duration: 3000,
                horizontalPosition: 'center',
                verticalPosition: 'top',
              });
            }
          );
        } else {
          // Create new sprint
          this.sprintService.createSprint(sprintData).subscribe(
            (result) => {
              this.snackBar.open('Sprint created successfully!', 'Close', {
                duration: 3000,
                horizontalPosition: 'center',
                verticalPosition: 'top',
              });
              this.dialogRef.close(result); // Close the dialog with new sprint data
            },
            (error) => {
              console.error('Creation failed', error);
              this.snackBar.open('Failed to create sprint!', 'Close', {
                duration: 3000,
                horizontalPosition: 'center',
                verticalPosition: 'top',
              });
            }
          );
        }
      } else {
        console.warn('Form is invalid');
        this.snackBar.open('Please fill all required fields!', 'Close', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
        });
      }
    }


onSubmit(): void {
  if (this.sprintForm.invalid) {
    console.warn('Form is invalid');
    this.snackBar.open('Please fill all required fields!', 'Close', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
    return;
  }

  const sprintData = {
    ...this.sprintForm.value,
    projectId: this.data.projectId,
    sprintId: this.currentSprint?.sprintId, // Include sprintId if editing
  };

  console.log('Sprint Data:', JSON.stringify(sprintData, null, 2));

  // Check for sprint name and number uniqueness
  this.sprintService.checkSprintExists(sprintData.sprintName, sprintData.sprintNo).subscribe(
    (exists: { nameExists: boolean; numberExists: boolean }) => {
      if (exists.nameExists && !this.editingSprint) {
        this.showSnackBar('Sprint name must be unique!');
        return;
      }

      if (exists.numberExists && !this.editingSprint) {
        this.showSnackBar('Sprint number must be unique!');
        return;
      }

      // Decide between create or update
      this.editingSprint ? this.updateSprint(sprintData) : this.createSprint(sprintData);
    },
    (error: HttpErrorResponse) => {
      console.error('Error checking sprint uniqueness:', error);
      this.showSnackBar('Failed to check uniqueness!');
    }
  );
}
*/
onSubmit(): void {
  if (this.sprintForm.invalid) {
    this.showSnackBar('Please fill all required fields!');
    return;
  }

  const sprintData = {
    ...this.sprintForm.value,
    projectId: this.data.projectId,
    sprintId: this.currentSprint?.sprintId || null, // Include sprintId if editing
  };

  console.log('Sprint Data:', JSON.stringify(sprintData, null, 2));

  this.sprintService.checkSprintExists(sprintData.sprintName, sprintData.sprintNo).subscribe(
    (exists: { nameExists: boolean; numberExists: boolean }) => {
      if (exists.nameExists && !this.editingSprint) {
        this.showSnackBar('Sprint name must be unique!');
        return;
      }
      if (exists.numberExists && !this.editingSprint) {
        this.showSnackBar('Sprint number must be unique!');
        return;
      }

      this.editingSprint ? this.updateSprint(sprintData) : this.createSprint(sprintData);
    },
    (error: HttpErrorResponse) => {
      console.error('Error checking uniqueness:', error);
      this.showSnackBar('Failed to check uniqueness!');
    }
  );
}

// Create new sprint
private createSprint(sprintData: any): void {
  this.sprintService.createSprint(sprintData).subscribe(
    (result) => {
      this.showSnackBar('Sprint created successfully!');
      this.dialogRef.close(result); // Close the dialog with new sprint data
    },
    (error) => {
      console.error('Creation failed', error);
      this.showSnackBar('Failed to create sprint!');
    }
  );
}

// Update existing sprint
private updateSprint(sprintData: any): void {
  this.sprintService.updateSprint(sprintData).subscribe(
    (result) => {
      this.showSnackBar('Sprint updated successfully!');
      this.dialogRef.close(result); // Close the dialog with updated sprint data
    },
    (error) => {
      console.error('Update failed', error);
      this.showSnackBar('Failed to update sprint!');
    }
  );
}

// Reusable snack bar method
private showSnackBar(message: string): void {
  this.snackBar.open(message, 'Close', {
    duration: 3000,
    horizontalPosition: 'center',
    verticalPosition: 'top',
  });
}


  deleteSprint(sprintId: number): void {
    this.sprintService.deleteSprint(sprintId).subscribe(() => {
      this.loadSprints(); // Reload sprints after deletion
    });
  }

  closeDialog(): void {
    this.isDialogOpen = false; // Close the dialog
    this.dialogRef.close(); // Close the dialog reference
  }
}
