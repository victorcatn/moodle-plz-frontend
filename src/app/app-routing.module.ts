import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';

import {StaffmemberListComponent} from './staffmember/staffmember-list/staffmember-list.component';
import {ProjectListComponent} from './project/project-list/project-list.component';
import {GroupListComponent} from './group/group-list/group-list.component';
import {SkillModelComponent} from './skill/skill-model/skill-model.component';
import {SkillDetailComponent} from './skill/skill-detail/skill-detail.component';
import {CreateSkillComponent} from './skill/create-skill/create-skill.component';
import {KnowledgeModelComponent} from './knowledge/knowledge-model/knowledge-model.component';
import {CreateKnowledgeComponent} from './knowledge/create-knowledge/create-knowledge.component';
import {EditSkillComponent} from './skill/edit-skill/edit-skill.component';
import {StaffmemberDetailComponent} from './staffmember/staffmember-detail/staffmember-detail.component';
import {CidimageComponent} from "./components/cidimage/cidimage.component";
import {ProjectComponentComponent} from "./project/project-component/project-component.component";
import {GroupComponentComponent} from './group/group-component/group-component.component';
import {LoginComponent} from './login/login.component';
import {KnowledgeDetailComponent} from "./knowledge/knowledge-detail/knowledge-detail.component";
import {KnowledgeEditComponent} from "./knowledge/knowledge-edit/knowledge-edit.component";

const routes: Routes = [
  {path: 'projects/create', component: ProjectComponentComponent},
  {path: 'projects/:id', component: ProjectComponentComponent},
  {path: 'projects', component: ProjectListComponent},
  {path: '', pathMatch: 'full', redirectTo: 'login'},
  {path: 'home', component: CidimageComponent},
  {path: 'staffmembers', component: StaffmemberListComponent},
  {path: 'staffmembers/create', component: StaffmemberDetailComponent},
  {path: 'staffmembers/:id', component: StaffmemberDetailComponent},
  {path: 'groups', component: GroupListComponent},
  {path: 'groups/create', component: GroupComponentComponent},
  {path: 'groups/:id', component: GroupComponentComponent},
  {path: 'groups/:id/edit', component: GroupComponentComponent},

  {path: 'skills', component: SkillModelComponent},
  {path: 'skills/create', component: CreateSkillComponent},
  {path: 'skills/:id', component: SkillDetailComponent},
  {path: 'skills/:id/edit', component: EditSkillComponent},
  {path: 'knowledges', component: KnowledgeModelComponent},
  {path: 'knowledges/create', component: CreateKnowledgeComponent},
  {path: 'knowledges/:id', component: KnowledgeDetailComponent},
  {path: 'knowledges/:id/edit', component: KnowledgeEditComponent},
  {path: 'login', component: LoginComponent}
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
export class AppRoutingModule {
}


