import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; 
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
//import { MatErrorModule } from '@angular/material/core'; 
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDialogModule } from '@angular/material/dialog'; // Ensure MatDialogModule is imported


import { ReactiveFormsModule } from '@angular/forms'; 
import { RouterModule } from '@angular/router'; 
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HomeComponent } from './home/home.component';
import { MainContentComponent } from './main-content/main-content.component';
import { LoginComponent } from './login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { UserserviceService } from './userservice.service';
import { RegisterComponent } from './register/register.component';
import { SearchPipe } from './search.pipe';
import { PaginationComponent } from './pagination/pagination.component';
import { StudentComponent } from './student/student.component';
import { SSidepanelComponent } from './s-sidepanel/s-sidepanel.component';
import { SMaincontentComponent } from './s-maincontent/s-maincontent.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { UserCreateComponent } from './user-create/user-create.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { UserViewComponent } from './user-view/user-view.component';
import { ProjectManagementComponent } from './project-task-management/project-management/project-management.component';
import { TaskManagementComponent } from './project-task-management/task-management/task-management.component';
import { CommonModule } from '@angular/common';

//import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidebarComponent,
    HomeComponent,
    MainContentComponent,
    LoginComponent,
    RegisterComponent,
    SearchPipe,
    PaginationComponent,
    StudentComponent,
    SSidepanelComponent,
    SMaincontentComponent,
    UserEditComponent,
    UserCreateComponent,
    UserViewComponent,
    ProjectManagementComponent,
    TaskManagementComponent
    
   
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatTableModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatDialogModule ,// Ensure MatDialogModule is imported here
    MatInputModule,
    AppRoutingModule,
    FontAwesomeModule,
    HttpClientModule,
    MatIconModule,
    ReactiveFormsModule,
    RouterModule,
    CommonModule
    
  ],
  providers: [UserserviceService, provideAnimationsAsync(), provideAnimationsAsync('noop')],
  bootstrap: [AppComponent],

})
export class AppModule { }
