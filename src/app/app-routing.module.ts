import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';

import {StaffmemberListComponent} from "./staffmember/staffmember-list/staffmember-list.component";
import {ProjectModelComponent} from "./project/project-model/project-model.component";
import {ProjectDetailComponent} from "./project/project-detail/project-detail.component";
import {GroupListComponent} from './group/group-list/group-list.component';
import {GroupDetailComponent} from './group/group-detail/group-detail.component';
import {GroupCreationComponent} from './group/group-creation/group-creation.component';

const routes: Routes = [
  { path: 'staffmember', component: StaffmemberListComponent },
  { path: 'project', component: ProjectModelComponent },
  { path: 'project/:id', component: ProjectDetailComponent },
  { path: 'groups', component: GroupListComponent },
  { path: 'groups/create', component: GroupCreationComponent },
  { path: 'groups/:id', component: GroupDetailComponent }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class AppRoutingModule { }


