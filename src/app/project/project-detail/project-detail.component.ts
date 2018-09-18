import {Component, OnInit} from '@angular/core';
import {Project} from "../Project";
import {ActivatedRoute} from "@angular/router";
import {ProjectServiceService} from "../service/project-service.service";

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.css']
})


export class ProjectDetailComponent implements OnInit {
  project: Project;

  constructor(
    private route: ActivatedRoute,
    private projectService: ProjectServiceService,

    /*private _location: Location*/) {}


  ngOnInit(): void{
    this.getProject()
  }

  getProject(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.projectService.getProject(id)
      .subscribe(project =>
        this.project = project
      );
  }


  goBack(): void {
    //this._location.back();
  }

  save(): void {
    this.projectService.updateProject(this.project)
      .subscribe(() => this.goBack());
  }

}
