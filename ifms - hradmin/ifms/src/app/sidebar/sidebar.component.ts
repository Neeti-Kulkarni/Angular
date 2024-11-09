import { Component } from '@angular/core';
import { faUser, faUsers, faProjectDiagram, faLock } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  faUser = faUser;
  faRoles = faUsers; 
  faProject = faProjectDiagram; 
  faLock = faLock;
}
