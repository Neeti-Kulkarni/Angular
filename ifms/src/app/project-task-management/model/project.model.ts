export class Project {
  projectId:number;
  projectName:string;
  description:string;
  assignedTo:number;
  startDate:Date;
  endDate:Date;

constructor(
  projectId: number = 0,
  projectName: string = '',
  description: string = '',
  assignedTo: number = 0,
  startDate: Date = new Date(),
  endDate: Date = new Date()
) {
  this.projectId = projectId;
  this.projectName = projectName;
  this.description = description;
  this.assignedTo = assignedTo;
  this.startDate = startDate;
  this.endDate = endDate;
}
}