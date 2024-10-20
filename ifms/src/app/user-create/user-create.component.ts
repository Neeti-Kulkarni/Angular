
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserserviceService } from '../userservice.service';
import { UserManagementDomain } from '../model/UserManagementDomain';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MatDialogRef } from '@angular/material/dialog';



@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']


})

export class UserCreateComponent implements OnInit {
  userForm!: FormGroup;  // Use non-null assertion to tell TypeScript it's safe
  // Declare userForm

  constructor(
    private fb: FormBuilder,
     public dialogRef: MatDialogRef<UserCreateComponent>,
    private userService: UserserviceService,
    private router: Router
  ) {}

  ngOnInit(): void {
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

createUser(): void {
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
}

onCancel() {
    this.dialogRef.close(); // Close dialog without saving
  }

}