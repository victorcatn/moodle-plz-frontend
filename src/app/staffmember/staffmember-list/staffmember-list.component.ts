import {Component, OnInit} from '@angular/core';
import {StaffMember} from '../StaffMember';
import {StaffMemberService} from '../service/staffmember.service';

@Component({
  selector: 'app-staffmember-list',
  templateUrl: './staffmember-list.component.html',
  styleUrls: ['./staffmember-list.component.css']
})
export class StaffmemberListComponent implements OnInit {

  staffMembers: StaffMember[];

  staffMember: StaffMember = {
    id: '',
    document: '',
    email: '',
    password: '',
    name: '',
    lastName: '',
    isHumanResourcesManager: null,
    available:null,
    skills: [],
    knowledges: []
  };

  constructor(private staffMemberService: StaffMemberService) { }

  ngOnInit() {
    this.getStaffMembers();
  }

  getStaffMembers(): void{
    this.staffMemberService.getStaffMembers().subscribe(staffMembers => this.staffMembers = staffMembers)
  }

  delete(staffMember: StaffMember): void{
    this.staffMembers = this.staffMembers.filter(h => h !== staffMember);
    this.staffMemberService.deleteStaffMember(staffMember).subscribe();
  }

}
