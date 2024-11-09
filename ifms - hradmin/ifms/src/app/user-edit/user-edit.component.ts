//import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { UserserviceService } from '../services/userservice.service'; // Adjust the path if necessary

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserManagementDomain } from '../model/UserManagementDomain';
//import { Component, OnInit, Inject } from '@angular/core'; // Add Inject here

import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { RoleService } from '../services/role.service';
import { RoleManagementDTO } from '../model/role-management-dto';
import { Component, OnInit, Inject, EventEmitter, Output } from '@angular/core'; // Add EventEmitter, Output



@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css'] // Update to your CSS file name
})
export class UserEditComponent implements OnInit {
  @Output() userUpdated = new EventEmitter<void>(); 

  userForm: FormGroup;
  userId: number | undefined;
  roles: any[] = []; // Initialize roles array
 // roles: RoleManagementDTO[] = []; 
 userData: any; // User data fetched from backend


  constructor(
    private userService: UserserviceService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    private roleService: RoleService,
    private dialogRef: MatDialogRef<UserEditComponent>, // Add dialog reference
    @Inject(MAT_DIALOG_DATA) public data: UserManagementDomain // Inject data

    
  ) {
    this.userForm = this.fb.group({
      userName: ['', [Validators.required, Validators.maxLength(255)]],
      mailId: ['', [Validators.required, Validators.email, Validators.maxLength(255)]],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],  // Adjusted pattern for 10 digits
      gender: ['', Validators.required],
      role: ['', Validators.required],
      address: [''],
      status: ['', Validators.required],
      dateOfBirth: ['', Validators.required]
    });
  } 


  ngOnInit(): void {
    this.loadRoles(); // Load roles for dropdown
    if (this.data) {
      this.userId = this.data.userId; // Set userId from the passed data
      console.log('Editing user data:', this.data); // Log the entire data
      this.setUserFormValues(this.data); // Pre-fill the form with the data passed from the dialog
    }
  }
/*   
    ngOnInit(): void {
      if (this.data) {
        // Pre-fill the form with the data passed from the dialog
        this.userId = this.data.userId;  // Set userId from the passed data
    
        this.userForm.patchValue({
          userName: this.data.userName,
          mailId: this.data.mailId,
          phone: this.data.phone,
          gender: this.data.gender,
          role: this.data.role,
          address: this.data.address,
          status: this.data.status,
          dateOfBirth: this.data.dateOfBirth,
        });
        console.log('Patched Form Value:', this.userForm.value);
      }
    }*/
  
      
      loadRoles() {
        this.roleService.getRoles().subscribe(
          (data: RoleManagementDTO[]) => {
            this.roles = data; // Set the roles array with fetched data
            console.log('Fetched roles:', this.roles); // Log fetched roles to console
      
            // Now that roles are loaded, check if user data is available
            if (this.data) {
              this.userId = this.data.userId; // Set userId from the passed data
      
              // Pre-fill the form with the user data
              this.setUserFormValues(this.data);
      
              // Check if the current role exists in the roles list by role name
              const currentRole = this.roles.find(role => role.roleName === this.data.role);
              if (currentRole) {
                // Set the current role by role name
                this.userForm.patchValue({
                  role: currentRole.roleName // Set the form field directly to the role name
                });
              } else {
                // Handle case where the role is not found
                console.warn('Current role not found in fetched roles:', this.data.role);
              }
            }
          },
          (error) => {
            console.error('Error loading roles', error); // Log errors if any
          }
        );
      }
      
      
      

      setUserFormValues(user: UserManagementDomain) {
        this.userForm.patchValue({
          userName: user.userName,
          mailId: user.mailId,
          phone: user.phone,
          gender: user.gender,
          address: user.address,
        //  status: user.status.toLowerCase(), 
          status: user.status,
          dateOfBirth: user.dateOfBirth,
        });
        console.log('Patched status:', this.userForm.value.status);
      }


  /*
  onSubmit(): void {
    console.log('User Form Controls:', this.userForm.controls);
    console.log('User Form Errors:', this.userForm.errors);
    console.log('Form Value:', this.userForm.value);
    console.log('Is Form Valid?', this.userForm.valid);
    console.log('User ID:', this.userId);

    Object.keys(this.userForm.controls).forEach(key => {
      const control = this.userForm.get(key);
      console.log(`Control: ${key}, Valid: ${control?.valid}, Errors: ${control?.errors}`);
    });

    if (this.userForm.valid && this.userId !== undefined) {
      this.userService.updateUser(this.userId, this.userForm.value).pipe(
        catchError(error => {
          console.error('Error updating user', error);
          alert('Failed to update user. Please check the logs.');
          return throwError(error);
        })
      ).subscribe(
        response => {
          console.log('User updated successfully', response);
          alert(`User with ID ${this.userId} updated successfully. Please check in database/postman.`);
          this.dialogRef.close(response);  // Close dialog and pass back result
          //this.router.navigate(['/user-list']); // Redirect after saving
        }
      );
      
    } else {
      console.error('Form is invalid or userId is undefined');
    }
  }*/

    onSubmit(): void {
      if (this.userForm.valid && this.userId !== undefined) {
        // Prepare the user object to send
        const updatedUser = {
          ...this.userForm.value,
          role: this.userForm.value.role // This should be roleName
        };
    
        this.userService.updateUser(this.userId, updatedUser).pipe(
          catchError(error => {
            console.error('Error updating user', error);
            alert('Failed to update user. Please check the logs.');
            return throwError(error);
          })
        ).subscribe(response => {
          console.log('User updated successfully', response);
          this.refreshUsers(); // Refresh list after update
          alert(`User with ID ${this.userId} updated successfully.`);
          this.userUpdated.emit(); // Emit event to parent to refresh user list
          this.dialogRef.close(response);  // Close dialog and pass back result
        });
      } else {
        console.error('Form is invalid or userId is undefined');
      }
    }

    refreshUsers(): void {
     // this.userService.getUsers().subscribe(users => {
       // this.user = users;  // Update the users array
      
     // });
    }
    
  onCancel(): void {
    this.dialogRef.close(); // Close the dialog without saving
  }

}
