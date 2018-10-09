import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Group} from '../Group';
import {Project} from '../../project/Project';
import {StaffMember} from '../../staffmember/StaffMember';
import {GroupService} from '../service/group-service.service';
import {ProjectServiceService} from '../../project/service/project-service.service';
import {StaffMemberService} from '../../staffmember/service/staffmember.service';
import {MatSelect, MatSnackBar} from '@angular/material';
import {AlgorithmGroup} from "../AlgorithmGroup";
import {AppService} from "../../app.service";

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


  selectedMembersInProject = [];
  selectedSuggested = [];
  selectedOther = [];
  selectedNonSuggested = [];


  @ViewChild(MatSelect) selectedProject: MatSelect;
  selectedProjectVal;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private groupService: GroupService,
              private projectService: ProjectServiceService,
              private staffMemberService: StaffMemberService,
              private service: AppService,
              public snackBar: MatSnackBar) { }

  ngOnInit() {
    this.algorithm = null;
    this.getProjects();
    this.getStafMembers();

    if (this.route.snapshot.url[1].path === 'create') {
      this.creating = true;
      this.group = new Group();

    } else if (this.route.snapshot.url[2] && this.route.snapshot.url[2].path === 'edit') {
      this.editing = true;

    } else {
      this.viewing = true;
    }

    this.showButton(this.service.isHUA());
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

  getStafMembers(): void {
    this.staffMemberService.getStaffMembers()
      .subscribe(members => this.members = members);
  }

  getGroup() {
    const id = this.route.snapshot.paramMap.get('id');
    this.groupService.getGroup(id)
      .subscribe(sgroup => {
        this.group = sgroup;

        if (this.editing) {
          this.selectedProjectVal = this.projects.filter(project => project.id === sgroup.projectId)[0];
          this.generateGroup(this.selectedProjectVal);
        }

      });
  }


  saveGroup() {
    if(this.selectedSuggested.concat(this.selectedOther, this.selectedNonSuggested, this.selectedMembersInProject).length>0) {
      this.group.membersId = this.selectedSuggested.concat(this.selectedOther, this.selectedNonSuggested, this.selectedMembersInProject);
      this.group.projectId = this.selectedProjectVal.id;
      if (this.creating) {
        this.groupService.addGroup(this.group)
          .subscribe(group => {
            this.group = new Group();
            this.router.navigate(['/groups']);
          });
      }
      else if (this.editing) {
        this.group.id = this.route.snapshot.paramMap.get('id');
        this.groupService.updateGroup(this.group)
          .subscribe(group => {
            this.group = new Group();
            this.router.navigate(['/groups'])
          })
      }
    }
    else{
      this.openSnackBar("You have to choose at least one staff member", "Accept");
    }
  }

  getProjectById(id): Project {
    return this.projects.filter(project => project.id === id)[0];
  }

  ngAfterViewInit() {
    if (this.creating){
      this.selectedProject.selectionChange.subscribe( s => this.generateGroup(s.value) );
    }
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

  /**
   * Show a message to the user
   * @param message the message to the user
   * @param action the text of the button
   */
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
    });
  }

  show = false;

  showButton(section){
    return this.show = section;
  }
}
