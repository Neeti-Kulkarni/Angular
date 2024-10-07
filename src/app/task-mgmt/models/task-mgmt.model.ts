export class TaskMgmt {
  taskId: number;
  taskName: string;
  description: string;
  status: string;
  startDate: Date;
  endDate: Date;
  projectId: number; // ProjectManagementDomain should be referenced by its ID
  dateCreated: Date;
  dateModified: Date;
}