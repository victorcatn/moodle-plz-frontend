import {Component, OnInit} from '@angular/core';
import {Project} from "../Project";
import {ProjectServiceService} from "../service/project-service.service";

@Component({
  selector: 'app-project-model',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent implements OnInit {
  projects: Project[];

  project: Project = {
  id:'',
  name:'',
  startDate:null,
  endDate:null,

  neededSkills:null,
  neededKnowledges:null,

  assignedGroupId:'',
};

  constructor(private projectService: ProjectServiceService) { }

  ngOnInit() {
    this.getProjects();
  }

  getProjects(): void {
    this.projectService.getProjects()
      .subscribe(projects => this.projects = projects);
  }


  delete(project: Project): void {
    this.projects = this.projects.filter(h => h !== project);
    this.projectService.deleteProject(project).subscribe();
  }

}
