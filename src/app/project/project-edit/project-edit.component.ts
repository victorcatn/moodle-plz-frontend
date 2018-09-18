import {Component, Input, OnInit} from '@angular/core';
import {Project} from "../Project";
import {ActivatedRoute} from "@angular/router";
import {ProjectServiceService} from "../service/project-service.service";

@Component({
  selector: 'app-project-edit',
  templateUrl: './project-edit.component.html',
  styleUrls: ['./project-edit.component.css']
})
export class ProjectEditComponent implements OnInit {

  @Input() project: Project;
  @Input() editedProject: Project;

  constructor(
    private route: ActivatedRoute,
    private projectService: ProjectServiceService

  ) { }

  ngOnInit() {
    this.getProject()

  }

  getProject(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.projectService.getProject(id)
      .subscribe(project =>
        this.project = project
      );
  }

  saveProject():void{
    this.projectService.updateProject(this.project).
    subscribe(project => this.project = new project())
  }

}
