import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectMgmtComponent } from './project-mgmt/project-mgmt.component';
import { TaskMgmtComponent } from './task-mgmt/task-mgmt.component';

const routes: Routes = [
  {path:'', component:ProjectMgmtComponent},
  {path:'', component:TaskMgmtComponent},
  {path: 'task-mgmt/:projectId', component: TaskMgmtComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
