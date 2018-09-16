import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {ProjectModelComponent} from "./project/project-model/project-model.component";
import {ProjectDetailComponent} from "./project/project-detail/project-detail.component";
import { SkillModelComponent } from './skill/skill-model/skill-model.component';
import { SkillDetailComponent } from './skill/skill-detail/skill-detail.component';
import { CreateSkillComponent } from './skill/create-skill/create-skill.component';

const routes: Routes = [
  { path: 'project', component: ProjectModelComponent },
  { path: 'project/:id', component: ProjectDetailComponent },
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


