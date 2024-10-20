
import { MatDialogModule } from '@angular/material/dialog';
//import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserserviceService } from '../userservice.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserManagementDomain } from '../model/UserManagementDomain';
//import { Component, OnInit, Inject } from '@angular/core'; // Add Inject here

import { Component, Inject } from '@angular/core';




import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';



@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.css']

})
export class UserViewComponent {

  constructor(
    public dialogRef: MatDialogRef<UserViewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: UserManagementDomain
   
  ) {}

  close(): void {
    this.dialogRef.close();
  }

}
