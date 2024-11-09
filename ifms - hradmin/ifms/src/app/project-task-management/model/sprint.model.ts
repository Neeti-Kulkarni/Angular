export enum SprintStatus {
  NEW = 'NEW',
  IN_PROGRESS = 'IN_PROGRESS',
  CLOSED = 'CLOSED',
  SUSPENDED = 'SUSPENDED'
}
export class Sprint {
  sprintId: number;
  sprintName: string;
  projectId: number;
  startDate: string;
  endDate: string;
  sprintNo: number;
  status:SprintStatus;
  //tasks?: Task[];

  constructor(
    sprintId: number,
    sprintName: string,
    projectId: number,
    startDate: string,
    endDate: string,
    sprintNo: number,
    status:SprintStatus
    
    //tasks?: Task[]
  ) {
    this.sprintId = sprintId;
    this.sprintName = sprintName;
    this.projectId = projectId;
    this.startDate = startDate;
    this.endDate = endDate;
    this.sprintNo = sprintNo;
    this.status = status;
    //this.tasks = tasks || []; // Initialize with an empty array if not provided
  }
}