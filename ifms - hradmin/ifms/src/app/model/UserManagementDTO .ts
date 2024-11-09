// user-management-dto.model.ts
export interface UserManagementDTO {
    userId: number;
    userName: string;
    mailId: string;
    phone: string;
    gender: string;
    role: string;
    status: string;
    address?: string;
    dateOfBirth: string;
    // Omit dateCreated and dateModified if not needed
}
