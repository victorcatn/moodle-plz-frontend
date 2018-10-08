import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Group} from '../Group';
import {Project} from '../../project/Project';
import {StaffMember} from '../../staffmember/StaffMember';
import {GroupService} from '../service/group-service.service';
import {ProjectServiceService} from '../../project/service/project-service.service';
import {MatSelect} from '@angular/material';
import {AlgorithmGroup} from "../AlgorithmGroup";

@Component({
  selector: 'app-group-component',
  templateUrl: './group-component.component.html',
  styleUrls: ['./group-component.component.css']
})
export class GroupComponentComponent implements OnInit, AfterViewInit {

  editing = false;
  creating = false;
  viewing = false;

  @Input()group: Group;

  projects: Project[];
  algorithm: AlgorithmGroup;
  members: StaffMember[];

  suggestedMembers: StaffMember[];
  otherMembers: StaffMember[];
  nonSuggestedStaffmembers: StaffMember[];

  selectedSuggested = [];
  selectedOther = [];
  selectedNonSuggested = [];


  @ViewChild(MatSelect) selectedProject: MatSelect;
  selectedProjectVal;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private groupService: GroupService,
              private projectService: ProjectServiceService) { }

  ngOnInit() {
    this.algorithm = null;
    this.getProjects();

    if (this.route.snapshot.url[1].path === 'create') {
      this.creating = true;
      this.group = new Group();

    } else if (this.route.snapshot.url[2] && this.route.snapshot.url[2].path === 'edit') {
      this.editing = true;

    } else {
      this.viewing = true;
    }
  }

  generateGroup(project: Project) {
    this.groupService.generateGroup(project).subscribe(algorithm =>
    this.algorithm = algorithm);
  }

  getProjects() {
    this.projectService.getProjects()
      .subscribe(projects => {
        this.projects = projects;
        if (!this.creating) { this.getGroup(); }

      });
  }

  getGroup() {
    const id = this.route.snapshot.paramMap.get('id');
    this.groupService.getGroup(id)
      .subscribe(sgroup => {
        this.group = sgroup;

        if (this.editing) {
          this.selectedProjectVal = this.projects.filter(project => project.id === sgroup.projectId)[0];
          this.generateGroup(this.selectedProjectVal); }

      });
  }

  saveGroup() {
    this.group.membersId = this.selectedSuggested.concat(this.selectedOther, this.selectedNonSuggested);
    this.group.projectId = this.selectedProjectVal.id;
    this.groupService.addGroup(this.group)
      .subscribe(group => {
        this.group = new Group();
        this.router.navigate(['/groups']);
      });
  }

  getProjectById(id): Project {
    return this.projects.filter(project => project.id === id)[0];
  }


  log() {
    console.log(this.selectedSuggested);
    console.log(this.selectedOther);
    console.log(this.group);
    // this.selectedOther = ["5b974358b9d2162bb0188c55"];
    this.selectedOther = this.selectedOther.slice(0);

  }
  ngAfterViewInit() {
    if (!this.viewing){
      this.selectedProject.selectionChange.subscribe( s => this.generateGroup(s.value) );
    }
  }
}
