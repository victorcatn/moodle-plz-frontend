import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import {Group} from '../Group';
import {GroupService} from '../service/group-service.service';

import {Project} from "../../project/Project";
import {ProjectServiceService} from "../../project/service/project-service.service";

import {StaffMember} from "../../staffmember/StaffMember";
import {StaffMemberService} from "../../staffmember/service/staffmember.service";

@Component({
  selector: 'app-group-creation',
  templateUrl: './group-creation.component.html',
  styleUrls: ['./group-creation.component.css']
})
export class GroupCreationComponent implements OnInit {
  
  projectSelection: FormGroup;
  groupSelection: FormGroup;
    
  group: Group = new Group();
  
  projects: Project[];
  members: StaffMember[];

  constructor(
  private groupService: GroupService,
  private projectService: ProjectServiceService,
  private staffMemberService: StaffMemberService,
  private _formBuilder: FormBuilder) { }

  ngOnInit() {
    this.projectSelection = this._formBuilder.group({
      projectId: ['', Validators.required]
    });
    this.groupSelection = this._formBuilder.group({
      membersSelection: [[], Validators.required]
    });
    
    this.getProjects();
  }

  generateGroup(project: Project){
    this.groupService.generateGroup(project)
      .subscribe((group) => {
        this.group = group;
        this.staffMemberService.getStaffMembers() //TODO: make a more efficient aproach in backend
          .subscribe(members => this.members = members); //TODO: Use the members sugested by generate
      });
  }
  
  addMembers(): void {
    let membersId = this.groupSelection.value['membersSelection'];
    this.group.membersId = membersId;
    
  }
  
  saveGroup(){
    this.groupService.addGroup(this.group)
      .subscribe(group => {
        this.group = new Group();
      });
  }
  
  getProjects(): void {
    this.projectService.getProjects()
      .subscribe(projects => this.projects = projects);
  }

}
