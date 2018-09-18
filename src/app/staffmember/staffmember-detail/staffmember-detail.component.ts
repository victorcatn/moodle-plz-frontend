import { Component, OnInit, Input } from '@angular/core';
import { StaffMember } from '../StaffMember';
import { StaffMemberService } from '../service/staffmember.service';
import { ActivatedRoute } from '@angular/router';
import { SkillServiceService } from '../../skill/service/skill-service.service';
import { KnowledgeServiceService } from '../../knowledge/service/knowledge-service.service';
import { Skill } from '../../skill/Skill';
import { Knowledge } from '../../knowledge/Knowledge';

@Component({
  selector: 'app-staffmember-detail',
  templateUrl: './staffmember-detail.component.html',
  styleUrls: ['./staffmember-detail.component.css']
})
export class StaffmemberDetailComponent implements OnInit {

  @Input() staffMember: StaffMember;

  skills: Skill[];

  skill: Skill = {
    id:'',
    name:''
  };

  knowledges: Knowledge[];

  knowledge: Knowledge = {
    id: '',
    name: ''
  };

  constructor(
    private route: ActivatedRoute,
    private staffMemberService: StaffMemberService,
    private skillService: SkillServiceService,
    private knowledgeService: KnowledgeServiceService
  ) { }

  ngOnInit() {
    this.getStaffMember();
    this.getSkills();
    this.getKnowledges();
  }

  getSkills(): void {
    this.skillService.getSkills()
      .subscribe(skills => this.skills = skills);
  }

  getKnowledges(): void{
    this.knowledgeService.getKnowledges().subscribe(knowledges => this.knowledges = knowledges)
  }

  getStaffMember(): void{
    const id = this.route.snapshot.paramMap.get('id');
    this.staffMemberService.getStaffMember(id)
      .subscribe(staffMember => this.staffMember = staffMember);
  }

}
