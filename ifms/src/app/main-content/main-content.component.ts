import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog'; // Import MatDialog
import { UserCreateComponent } from '../user-create/user-create.component'; 
import { UserEditComponent } from '../user-edit/user-edit.component'; // Import UserEditComponent
import { UserManagementDomain } from '../model/UserManagementDomain';
import { UserViewComponent } from '../user-view/user-view.component';


import { UserserviceService } from '../userservice.service';
import { MatPaginator } from '@angular/material/paginator';

 @Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.css']

})
export class MainContentComponent implements OnInit{
  users: any[] = [];
  paginatedData: any[] = [];
  displayedColumns: string[] = ['id', 'name', 'role', 'email', 'phone', 'actions'];
  searchTerm: string = '';
  pageIndex: number = 0;
  pageSize: number = 5; 
  pageSizeOptions: number[] = [5, 10]; // Allow 5 or 10 items per page
  length: number = 0;

  constructor(private userService: UserserviceService,
    private dialog: MatDialog, 
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userService.getUsers().subscribe(data => {
      console.log(data);  // Log the data to see its structure
      this.users = data;
      this.length = this.users.length;
      this.updatePaginatedData();
    });
  }

  filterUsers(): void {
    this.pageIndex = 0;
    this.updatePaginatedData();
  }

  updatePaginatedData(): void {
    const filteredUsers = this.users.filter(user =>
      user.userName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      user.mailId.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      user.role.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      user.phone.includes(this.searchTerm)
    );
    const startIndex = this.pageIndex * this.pageSize;
    this.paginatedData = filteredUsers.slice(startIndex, startIndex + this.pageSize);
    // this.paginatedData = filteredUsers.slice(this.pageIndex * 2, (this.pageIndex + 1) * 2);
  }

  onPaginateChange(event: any): void {
    this.pageIndex = event.pageIndex;
    this.updatePaginatedData();
  }  
  

  viewUser(user: UserManagementDomain): void {
    // Logic for viewing user details
    const dialogRef = this.dialog.open(UserViewComponent, {
   // this.dialog.open(UserViewComponent, {
      width: '500px', // Adjust the width as needed
      data: user // Pass the selected user data to the dialog
    });
  }




  
  addNewUser(): void {     
    // this.router.navigate(['/user-create']);
    const dialogRef = this.dialog.open(UserCreateComponent, {
     // width: '100%', // Set width to 100%
     width: '500px', // Customize the width of the modal
   });
 // After the dialog is closed
 dialogRef.afterClosed().subscribe(result => {
   console.log('The dialog was closed');
   // Refresh users list after closing, if necessary
   this.ngOnInit(); // Reload users if new user was created
 });
 }

 /*
    editUser(user: UserManagementDomain) {
      this.router.navigate(['/user-edit', user.userId], {
        queryParams: {
          userName: user.userName,
          mailId: user.mailId,
          phone: user.phone,
          gender: user.gender,
          role: user.role,
          status: user.status,
          address: user.address,
          //dateCreated: user.dateCreated,
          //dateModified: user.dateModified,
          dateOfBirth: user.dateOfBirth
        }
      });
    }*/

      editUser(user: UserManagementDomain): void {
        const dialogRef = this.dialog.open(UserEditComponent, {
          width: '500px', // Set the width of the dialog
          data: user // Pass user data to the dialog
        });
      
        dialogRef.afterClosed().subscribe(result => {
          console.log('The dialog was closed');
          // Refresh users list after closing, if necessary
          this.ngOnInit(); // Reload users if user was updated
        });
      }
      


  deactivateUser(user: UserManagementDomain): void {
    // Logic for deactivating a user
  }
}

