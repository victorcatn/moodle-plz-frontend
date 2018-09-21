import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';

import {StaffmemberListComponent} from "./staffmember/staffmember-list/staffmember-list.component";
import {ProjectModelComponent} from "./project/project-model/project-model.component";
import {GroupListComponent} from './group/group-list/group-list.component';
import {GroupDetailComponent} from './group/group-detail/group-detail.component';
import {GroupCreationComponent} from './group/group-creation/group-creation.component';
import {SkillModelComponent} from './skill/skill-model/skill-model.component';
import {SkillDetailComponent} from './skill/skill-detail/skill-detail.component';
import {CreateSkillComponent} from './skill/create-skill/create-skill.component';
import {KnowledgeModelComponent} from './knowledge/knowledge-model/knowledge-model.component';
import {CreateKnowledgeComponent} from './knowledge/create-knowledge/create-knowledge.component';
import {EditSkillComponent} from './skill/edit-skill/edit-skill.component';
import {CreateStaffmemberComponent} from './staffmember/create-staffmember/create-staffmember.component';
import {StaffmemberDetailComponent} from './staffmember/staffmember-detail/staffmember-detail.component';
import {CidimageComponent} from "./components/cidimage/cidimage.component";
import {ProjectComponentComponent} from "./project/project-component/project-component.component";

const routes: Routes = [
  {path: 'projects/create', component : ProjectComponentComponent},
  {path: 'projects/:id', component : ProjectComponentComponent},


  { path: '', component: CidimageComponent },
  { path: 'home', component: CidimageComponent },
  { path: 'staffmembers', component: StaffmemberListComponent },
  { path: 'staffmembers/create', component: CreateStaffmemberComponent },
  { path: 'staffmembers/:id', component: StaffmemberDetailComponent },
  { path: 'projects', component: ProjectModelComponent },



  { path: 'groups', component: GroupListComponent },
  { path: 'groups/create', component: GroupCreationComponent },
  { path: 'groups/:id', component: GroupDetailComponent },
  { path: 'skills', component: SkillModelComponent },
  { path: 'skills/create', component: CreateSkillComponent },
  { path: 'skills/:id/', component: SkillDetailComponent },
  { path: 'skills/:id/edit', component: EditSkillComponent },
  { path: 'knowledges', component: KnowledgeModelComponent },
  { path: 'knowledges/create', component: CreateKnowledgeComponent },
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


