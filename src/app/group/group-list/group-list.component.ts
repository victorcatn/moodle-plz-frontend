import {Component, OnInit} from '@angular/core';
import {Group} from '../Group';
import {GroupService} from '../service/group-service.service';
import {ProjectServiceService} from "../../project/service/project-service.service";
import {StaffMember} from "../../staffmember/StaffMember";
import {Project} from "../../project/Project";
import {StaffMemberService} from "../../staffmember/service/staffmember.service";
import {AppService} from "../../app.service";

@Component({
  selector: 'app-group-list',
  templateUrl: './group-list.component.html',
  styleUrls: ['./group-list.component.css']
})
export class GroupListComponent implements OnInit {
  groups: Group[];
  projects: Project[];
  members: StaffMember[];

  constructor(private groupService: GroupService,
              private projectService: ProjectServiceService,
              private staffService: StaffMemberService,
              private service: AppService) { }

  ngOnInit() {
    this.getGroups();
    this.getprojects();
    this.getStafMembers();
    this.showButton(this.service.isHUA());
  }

  getprojects() : void{
    this.projectService.getProjects()
      .subscribe(projects => this.projects = projects);
  }

  getStafMembers(): void {
    this.staffService.getStaffMembers()
      .subscribe(members => this.members = members);
  }

  getGroups(): void {
    this.groupService.getGroups()
      .subscribe(groups => this.groups = groups);
  }

  delete(group: Group): void { //TODO: add confirmation
    this.groups = this.groups.filter(h => h !== group);
    this.groupService.deleteGroup(group).subscribe();
  }

  getProjectName(idproject : string) {
    for (let project of this.projects) {
      if (project.id == idproject) {
        return project.name;
      }
    }
    return "";
  }

  getMembersInGroup(membersId : String[]) : StaffMember[]{
    let staffmembers : StaffMember[] = [];
    for(let idMember of membersId){
      for(let staffMember of this.members){
        if(idMember == staffMember.id){
          staffmembers.push(staffMember);
        }
      }
    }

    return staffmembers;
  }

  show = false;

  showButton(section){
    return this.show = section;
  }

}
