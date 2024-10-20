//import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserserviceService } from '../userservice.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserManagementDomain } from '../model/UserManagementDomain';
import { Component, OnInit, Inject } from '@angular/core'; // Add Inject here

import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';





@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css'] // Update to your CSS file name
})
export class UserEditComponent implements OnInit {
  userForm: FormGroup;
  userId: number | undefined;

  constructor(
    private userService: UserserviceService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
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

/*
  ngOnInit(): void {
  this.userId = this.data.userId; // Get the userId from the passed data
    this.userId = +this.route.snapshot.paramMap.get('id')!;
    console.log('User ID from route:', this.userId);
    
    this.userService.getUserById(this.userId).subscribe(user => {
      this.userForm.patchValue({
        userName: user.userName, 
        mailId: user.mailId ,
        phone: user.phone ,
        gender: user.gender,
        role: user.role,
        address: user.address,
        status: user.status,
        dateOfBirth: user.dateOfBirth,
      });
      console.log('Patched Form Value:', this.userForm.value);
    });
  }*/
/*
    ngOnInit(): void {
      this.userId = +this.route.snapshot.paramMap.get('id')!;
    
      // Get query parameters
      this.route.queryParams.subscribe(params => {
        this.userForm.patchValue({
          userName: params['userName'], 
          mailId: params['mailId'],
          phone: params['phone'],
          gender: params['gender'],
          role: params['role'],
          address: params['address'],
          status: params['status'],
          dateOfBirth: params['dateOfBirth'],
        });
      });
      
      console.log('Patched Form Value:', this.userForm.value);
    }*/
    
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
    }
    


  
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
  }

  onCancel(): void {
    this.dialogRef.close(); // Close the dialog without saving
  }

}
