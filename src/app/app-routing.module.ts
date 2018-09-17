import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';

import {StaffmemberListComponent} from "./staffmember/staffmember-list/staffmember-list.component";
import {ProjectModelComponent} from "./project/project-model/project-model.component";
import {ProjectDetailComponent} from "./project/project-detail/project-detail.component";
import {GroupListComponent} from './group/group-list/group-list.component';
import {GroupDetailComponent} from './group/group-detail/group-detail.component';
import {GroupCreationComponent} from './group/group-creation/group-creation.component';
import { SkillModelComponent } from './skill/skill-model/skill-model.component';
import { SkillDetailComponent } from './skill/skill-detail/skill-detail.component';
import { CreateSkillComponent } from './skill/create-skill/create-skill.component';
import {ProjectCreationComponent} from "./project/project-creation/project-creation.component";

const routes: Routes = [
  { path: 'staffmember', component: StaffmemberListComponent },
  { path: 'projects', component: ProjectModelComponent },
  { path: 'projects/id/:id', component: ProjectDetailComponent },
  { path: 'projects/create', component: ProjectCreationComponent },
  { path: 'groups', component: GroupListComponent },
  { path: 'groups/create', component: GroupCreationComponent },
  { path: 'groups/:id', component: GroupDetailComponent },
  { path: 'skills', component: SkillModelComponent },
  { path: 'skills/create', component: CreateSkillComponent },
  { path: 'skills/:id', component: SkillDetailComponent },
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


