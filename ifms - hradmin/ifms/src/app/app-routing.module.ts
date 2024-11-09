import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { StudentComponent} from './student/student.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { UserCreateComponent } from './user-create/user-create.component';
import { UserViewComponent } from './user-view/user-view.component';
import { ProjectManagementComponent } from './project-task-management/project-management/project-management.component';
import { HrAdminComponent } from './hr-admin/hr-admin.component';
import { HrAdminProjectsComponent } from './hr-admin-projects/hr-admin-projects.component';
import { HrAdminUsersComponent } from './hr-admin-users/hr-admin-users.component';

const routes: Routes = [
  { path:"", component:HomeComponent},
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'admin-dashboard', component: HomeComponent },
  { path: 'student', component: StudentComponent },
  { path: 'user-edit/:id', component: UserEditComponent },
  { path: 'user-create', component: UserCreateComponent },
  { path: 'user-list', component: HomeComponent },
  { path: 'project-management', component: ProjectManagementComponent},
  {
    path: 'hr-admin',
    component: HrAdminComponent, // Parent component with the header and sidebar
    children: [
      {path: 'hr-admin-projects', component: HrAdminProjectsComponent}, // Child component that displays in <router-outlet>
      {path:'hr-admin-users', component: HrAdminUsersComponent}
    ]
  }
   
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
