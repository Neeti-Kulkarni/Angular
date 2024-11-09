import { UserManagementDomain } from "../../model/UserManagementDomain";

export enum ProjectStatus {
  NOT_STARTED = 'NOT_STARTED',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  ON_HOLD = 'ON_HOLD',
}
export class Project {
  projectId:number;
  projectName:string;
  description:string;
  assignedTo:number;
  startDate:Date;
  endDate:Date;
  
  assignedUserIds: number[];
  assignedUserNames: string[];
  sprintIds:number[];
  sprintNames:string[];
  status:ProjectStatus;
  
constructor(
  projectId: number = 0,
  projectName: string = '',
  description: string = '',
  assignedTo: number = 0,
  startDate: Date = new Date(),
  endDate: Date = new Date(),
  assignedUserIds = [],
  assignedUserNames = [],
  sprintIds = [],
  sprintNames = [],
  status:ProjectStatus
) {
  this.projectId = projectId;
  this.projectName = projectName;
  this.description = description;
  this.assignedTo = assignedTo;
  this.startDate = startDate;
  this.endDate = endDate;
  this.assignedUserIds = assignedUserIds;
  this.assignedUserNames = assignedUserNames;
  this.sprintIds = sprintIds;
  this.sprintNames = sprintNames;
  this.status = status;
}

}