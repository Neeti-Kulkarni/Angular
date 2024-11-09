import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog'; // Import MatDialog
import { UserCreateComponent } from '../user-create/user-create.component'; 
import { UserEditComponent } from '../user-edit/user-edit.component'; // Import UserEditComponent
import { UserManagementDomain } from '../model/UserManagementDomain';
import { UserViewComponent } from '../user-view/user-view.component';


import { UserserviceService } from '../services/userservice.service'; // Adjust the path if necessary



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


  


  ngOnInit(): void { //getUsers

    this.userService.getUsers().subscribe(data => {
   // this.userService.getAllUsersSorted().subscribe(data => {
      console.log(data);  // Log the data to see its structure
      this.users = data;
      this.length = this.users.length;
      this.updatePaginatedData();
      this.refreshUsers(); // Load users on initialization
      
    });
  }

  refreshUsers(): void {
    this.userService.getUsers().subscribe(users => {
      this.users = users;  // Update the users array
      this.length = this.users.length; // Update the length for pagination
      this.updatePaginatedData(); // Ensure the paginated data is updated
    });
  }


  filterUsers(): void {
    this.pageIndex = 0;
    this.updatePaginatedData();
  }

  updatePaginatedData(): void {
   // const activeUsers = this.users.filter(user => user.status === 'active');
    //const deactivatedUsers = this.users.filter(user => user.status === 'inactive');
  
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
 /*
  updatePaginatedData(): void {
    // Filter users based on search term and separate active and inactive users
    const filteredUsers = this.users.filter(user =>
      user.userName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      user.mailId.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      user.role.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      user.phone.includes(this.searchTerm)
    );

    // Sort users: active users first, inactive users last
    const sortedUsers = filteredUsers.sort((a, b) => 
      a.status === 'active' ? -1 : 1
    );

    const startIndex = this.pageIndex * this.pageSize;
    this.paginatedData = sortedUsers.slice(startIndex, startIndex + this.pageSize);
  }
  */

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
   //this.ngOnInit(); // Reload users if new user was created
   this.refreshUsers(); // Reload users if a new user was created
 });
 }

      editUser(user: UserManagementDomain): void {
        const dialogRef = this.dialog.open(UserEditComponent, {
          width: '500px', // Set the width of the dialog
          data: user // Pass user data to the dialog
        });
      
    /*   dialogRef.afterClosed().subscribe(result => {
          console.log('The dialog was closed');
          // Refresh users list after closing, if necessary
        //  this.ngOnInit(); // Reload users if user was updated
          this.refreshUsers(); // Reload users if the user was updated
        });
      }
      
      toggleUserStatus(user: UserManagementDomain): void {
        const updatedStatus = user.status === 'Active' ? 'Inactive' : 'Active';
        const updateData = { status: updatedStatus };
      
        this.userService.updateUserStatus(user.userId, updateData).subscribe(
          response => {
            console.log('Status updated successfully:', response);
            user.status = updatedStatus;  // Update the user's status locally
            this.refreshUsers(); // Refresh the user list to reflect the change
            // Refresh the view by reassigning the data source
            this.paginatedData = [...this.paginatedData];
          },
          error => {
            console.error('Error updating user status:', error);
            alert('Failed to update user status. Please try again.');
          }
        );
      } 
    }*/
      
    

        dialogRef.afterClosed().subscribe(result => {
          if (result) {
            const updatedUser = result;
    
            // Update the user status in the paginatedData
            const index = this.paginatedData.findIndex(u => u.userId === updatedUser.userId);
            if (index !== -1) {
              this.paginatedData[index] = updatedUser;
    
              // Refresh the view by reassigning the data source
              this.paginatedData = [...this.paginatedData];
              this.refreshUsers();
            }
          }
        });
      }
    
      toggleUserStatus(user: UserManagementDomain): void {
        const updatedStatus = user.status === 'Active' ? 'Inactive' : 'Active';
        const updateData = { status: updatedStatus };
      
        this.userService.updateUserStatus(user.userId, updateData).subscribe(response => {
          console.log('Status updated successfully:', response);
          user.status = updatedStatus; // Update the user's status locally
      
          // Update the user in the paginatedData array
          const index = this.paginatedData.findIndex(u => u.userId === user.userId);
          if (index !== -1) {
            this.paginatedData[index].status = updatedStatus; // Update the status in paginated data
      
            // Refresh the view by reassigning the data source
            this.paginatedData = [...this.paginatedData];
            this.refreshUsers(); // Refresh users after toggling status
          }
        }, error => {
          console.error('Error updating user status:', error);
          alert('Failed to update user status. Please try again.');
        });
      }   
      
    }


        
  




