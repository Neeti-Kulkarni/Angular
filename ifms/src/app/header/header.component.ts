import { Component, Output, EventEmitter} from '@angular/core';
import { faSignOutAlt,faSearch } from '@fortawesome/free-solid-svg-icons';
import { UserserviceService } from '../userservice.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  faSignOutAlt = faSignOutAlt; 
  faSearch = faSearch;
  isDropdownOpen = false; 
  searchTerm: any = '';

  constructor(private userserviceService: UserserviceService) {}

  toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen; // Toggle dropdown visibility
  }

  onLogout(): void {
    // Implement logout logic here
    console.log('Logout clicked');
    this.isDropdownOpen = false; // Close dropdown on action
  }

  onUpdateProfile(): void {
    // Implement update profile logic here
    console.log('Update Profile clicked');
    this.isDropdownOpen = false; // Close dropdown on action
  }
   
    onSearch(searchTerm:any){
     this.userserviceService.getSearchString(searchTerm);
   }
}
