import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {ProjectModelComponent} from "./project/project-model/project-model.component";
import {ProjectDetailComponent} from "./project/project-detail/project-detail.component";

const routes: Routes = [
  { path: 'project', component: ProjectModelComponent },
  { path: 'project/:id', component: ProjectDetailComponent },
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


