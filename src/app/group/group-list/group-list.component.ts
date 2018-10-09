import { Component, OnInit } from '@angular/core';
import {Group} from '../Group';
import {GroupService} from '../service/group-service.service';
import {AppService} from "../../app.service";

@Component({
  selector: 'app-group-list',
  templateUrl: './group-list.component.html',
  styleUrls: ['./group-list.component.css']
})
export class GroupListComponent implements OnInit {
  groups: Group[];

  constructor(private groupService: GroupService, private service: AppService) { }

  ngOnInit() {
    this.getGroups();
    this.showButton(this.service.isHUA());
  }

  getGroups(): void {
    this.groupService.getGroups()
      .subscribe(groups => this.groups = groups);
  }


  delete(group: Group): void { //TODO: add confirmation
    this.groups = this.groups.filter(h => h !== group);
    this.groupService.deleteGroup(group).subscribe();
  }

  show = false;

  showButton(section){
    return this.show = section;
  }

}
