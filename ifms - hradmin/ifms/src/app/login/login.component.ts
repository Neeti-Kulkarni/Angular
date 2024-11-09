import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  usernameOrEmail: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onLogin() {
    this.authService.login(this.usernameOrEmail, this.password).subscribe(user => {
      if (user) {
        // Redirect based on role
        switch (user.role) {
          case 'admin':
            this.router.navigate(['/admin-dashboard']);
            break;
          case 'student':
            this.router.navigate(['/student-dashboard']);
            break;
          case 'HR':
            this.router.navigate(['/hr-dashboard']);
            break;
          case 'vendorHR':
            this.router.navigate(['/vendorhr-dashboard']);
            break;
          case 'projectManager':
            this.router.navigate(['/projectmanager-dashboard']);
            break;
          default:
            alert('Unknown role. Access denied.');
            break;
        }
      } else {
        // Handle login failure
        alert('Invalid credentials');
      }
    },
  error => {
    console.error('Login error', error);
    alert('Login failed. Please try again.');
  });
  }
 
}
