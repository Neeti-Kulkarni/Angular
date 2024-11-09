
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { UserserviceService } from '../services/userservice.service'; // Adjust the path if necessary

import { UserManagementDomain } from '../model/UserManagementDomain';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MatDialogRef } from '@angular/material/dialog';
import { RoleService } from '../services/role.service';
import { RoleManagementDTO } from '../model/role-management-dto';




@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']


})

export class UserCreateComponent implements OnInit {
  @Output() userCreated = new EventEmitter<UserManagementDomain>(); //using as a output in hr-admin component

  userForm!: FormGroup;  // Use non-null assertion to tell TypeScript it's safe
  roles: any[] = []; // Initialize roles array


  constructor(
    private fb: FormBuilder,
     public dialogRef: MatDialogRef<UserCreateComponent>,
    private userService: UserserviceService,
    private roleService: RoleService,
    private router: Router
  ) {}

 


/*
  ngOnInit(): void {
    this.loadRoles();
    this.userForm = this.fb.group({
      userName: ['', [Validators.required, Validators.minLength(1)]],
      mailId: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern('\\d{10}')]],
      gender: ['', Validators.required],
      role: ['', Validators.required],
      address: [''],
      status: ['', Validators.required],
      dateOfBirth: ['', Validators.required]
      
    });
  }*/

    ngOnInit(): void {         
        this.initializeForm();
        this.loadRoles(); 
      }

   
      

      loadRoles() {
        this.roleService.getRoles().subscribe(
          (data: any[]) => {
            this.roles = data;
            // Set default role after roles are loaded
            this.userForm.get('role')?.setValue('INTERNAL_USER');
          },
          (error: any) => {
            console.error('Error loading roles', error);
            alert('Error loading roles.');
          }
        );
      }
// Initialize the form fields
initializeForm(): void {
    this.userForm = this.fb.group({
      userName: ['', [Validators.required, Validators.minLength(1)]],
      mailId: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern('\\d{10}')]],
      gender: ['', Validators.required],
      role: ['', Validators.required],
      address: [''],
      status: ['', Validators.required],
      dateOfBirth: ['', Validators.required]
    });
  }


  


  onSubmit(): void {
    if (this.userForm.valid) {
      const username = this.capitalizeFirstLetter(this.userForm.get('userName')?.value);

       // Update the form value with the capitalized username
    this.userForm.get('userName')?.setValue(username);
    
    //  const username = this.userForm.get('userName')?.value;
      const phone = this.userForm.get('phone')?.value;
      const email = this.userForm.get('mailId')?.value; // Fetch the email

      this.checkUsernameExists(username, phone, email);
    } else {
      alert('Please fill in all required fields.');
    }
  }

    // Helper function to capitalize the first letter of a string
    private capitalizeFirstLetter(string: string): string {
      if (string.length === 0) return string; // Return empty string if input is empty
      return string.charAt(0).toUpperCase() + string.slice(1);
    }

  checkUsernameExists(username: string, phone: string, email: string): void {
    this.userService.checkUsernameExists(username).subscribe(
      (usernameExists: boolean) => {
        if (usernameExists) {
          alert('Username already exists. Please choose another.');
        } else {
          this.checkPhoneExists(phone, email); // Pass email to the next check
        }
      },
      (error) => {
        console.error('Error checking username existence', error);
        alert('Error checking username existence.');
      }
    );
  }

  checkPhoneExists(phone: string, email: string): void {
    this.userService.checkPhoneExists(phone).subscribe(
      (phoneExists: boolean) => {
        if (phoneExists) {
          alert('Phone number already exists. Please use a different one.');
        } else {
          this.checkEmailExists(email); // Proceed to email check
        }
      },
      (error) => {
        console.error('Error checking phone existence', error);
        alert('Error checking phone existence.');
      }
    );
  }

  checkEmailExists(email: string): void {
    this.userService.checkEmailExists(email).subscribe(
      (emailExists: boolean) => {
        if (emailExists) {
          alert('Email already exists. Please use a different one.');
        } else {
          this.createUser();  // Proceed to user creation if all checks are passed
        }
      },
      (error) => {
        console.error('Error checking email existence', error);
        alert('Error checking email existence.');
      }
    );
  }

  /*

  onSubmit(): void {
    console.log('Form Valid:', this.userForm.valid);
    console.log('Form Errors:', this.userForm.errors);
    Object.keys(this.userForm.controls).forEach(key => {
        const control = this.userForm.get(key);
        console.log(`Control: ${key}, Valid: ${control?.valid}, Errors: ${control?.errors}`);
    });

    if (this.userForm.valid) {
        const username = this.userForm.get('userName')?.value;
        const phone = this.userForm.get('phone')?.value;

        console.log('Checking if username exists:', username);
        this.userService.checkUsernameExists(username).subscribe(
            usernameExists => {
                if (usernameExists) {
                    alert('Username already exists. Please choose another.');
                } else {
                    console.log('Username is unique. Proceeding to check phone number:', phone);
                    
                    // Now check if the phone number exists
                    this.userService.checkPhoneExists(phone).subscribe(
                        phoneExists => {
                            if (phoneExists) {
                                alert('Phone number already exists. Please use a different one.');
                            } else {
                                // Proceed to create the user only if both username and phone number are unique
                                this.createUser();
                            }
                        },
                        error => {
                            console.error('Error checking phone existence', error);
                            alert('Error checking phone existence.');
                        }
                    );
                }
            },
            error => {
                console.error('Error checking username existence', error);
                alert('Error checking username existence.');
            }
        );
    } else {
        console.error('Form is invalid');
        alert('Please fill in all required fields.');
    }
}
*/
// Create a new user
  createUser(): void {
    this.userService.createUser(this.userForm.value).subscribe(
      (response) => {
        alert(`User created successfully. User ID: ${response.userId}`);
       // this.loadUsers();
        this.dialogRef.close(); // Close the dialog after user creation
      },
      (error) => {
        console.error('Error creating user', error);
        // Handle specific error messages based on the response
        if (error.status === 409) {
          if (error.error === 'Username already exists.') {
            alert('User creation failed: Duplicate username.');
          } else if (error.error === 'Phone number already exists.') {
            alert('User creation failed: Duplicate phone number.');
          } else if (error.error === 'Email already exists.') {
            alert('User creation failed: Duplicate email.');
          } else {
            alert('User creation failed: Duplicate username or phone.');
          }
        } else {
          alert('An error occurred while creating the user.');
        }
      }
    );
  }

/*createUser(): void {
    this.userService.createUser(this.userForm.value).subscribe(
        response => {
            console.log('User created successfully', response);
            alert(`User created successfully. User ID: ${response.userId}`);
            this.dialogRef.close(); // Close the dialog after user creation
            //this.router.navigate(['/user-list']); // Redirect to the user list
        },
        error => {
            console.error('Error creating user', error);
            alert('Failed to create user. ' + (error.error || ''));
        }
    );
} */

onCancel() {
    this.dialogRef.close(); // Close dialog without saving
  }

}