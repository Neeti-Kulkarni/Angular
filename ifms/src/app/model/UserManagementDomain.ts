// user-management-domain.model.ts
export interface UserManagementDomain {
   /* ID: number;
    Name: string;
    Role : string;
    Email: any;
    Phone: number;
    Actions: any;
    // Add other fields as necessary */

    userId: number;
    userName: string;
    mailId: string;
    phone: string;
    gender: string;
    role: string;
    status: string;
    address?: string;
    dateOfBirth: string;
    dateCreated: string; 
    dateModified: string; 
   // isActive: boolean; // Add this line*/
  }