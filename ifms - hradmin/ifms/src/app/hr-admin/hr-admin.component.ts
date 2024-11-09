import { Component, OnInit } from '@angular/core';
import { UserCreateComponent } from '../user-create/user-create.component'; // for using user-create component functionality
import { UserserviceService } from '../services/userservice.service'; // for using userservice functionality
import { UserManagementDomain } from '../model/UserManagementDomain'; //for using the existing models in usermanagementdomain
import { faUsers } from '@fortawesome/free-solid-svg-icons'; // Import the faUsers icon
import { MatDialog } from '@angular/material/dialog';
import { ProjectManagementService } from '../project-task-management/services/project-management.service';
import { Project } from '../project-task-management/model/project.model'; // Import the project model if needed






@Component({
  selector: 'app-hr-admin',
  templateUrl: './hr-admin.component.html',
  styleUrl: './hr-admin.component.css'
})

export class HrAdminComponent  {
  

 
  }
    