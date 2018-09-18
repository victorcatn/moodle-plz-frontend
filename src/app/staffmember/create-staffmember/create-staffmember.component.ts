import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Skill } from '../../skill/Skill';
import { SkillServiceService } from '../../skill/service/skill-service.service';
import { Knowledge } from '../../knowledge/Knowledge';
import { KnowledgeServiceService } from '../../knowledge/service/knowledge-service.service';
import { SkillScore } from '../../skill/SkillScore';
import { KnowledgeScore } from '../../knowledge/KnowledgeScore';
import { StaffMember } from '../StaffMember';
import { StaffMemberService } from '../service/staffmember.service';

@Component({
  selector: 'app-create-staffmember',
  templateUrl: './create-staffmember.component.html',
  styleUrls: ['./create-staffmember.component.css']
})
export class CreateStaffmemberComponent implements OnInit {

  skillSelection: FormGroup;
  knowledgeSelection: FormGroup;
  skillScoreG: FormGroup;
  knowledgeScoreG: FormGroup;
  personalInformation: FormGroup;

  staffMember: StaffMember = new StaffMember();
  staffMembers: StaffMember[];

  skillScore: SkillScore[] = [];
  knowledgeScore: KnowledgeScore[] = [];

  skills: Skill[];
  knowledges: Knowledge[];

  addedSkills: Skill[];
  addedKnowledges: Knowledge[];

  constructor(
    private staffMemberService: StaffMemberService,
    private skillService: SkillServiceService,
    private knowledgeService: KnowledgeServiceService,
    private _formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.personalInformation = this._formBuilder.group({
      name: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      document: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    })
    this.skillSelection = this._formBuilder.group({
      skillSelection: [[], Validators.required]
    });
    this.knowledgeSelection = this._formBuilder.group({
      knowledgeSelection: [[], Validators.required]
    });
    this.skillScoreG = this._formBuilder.group({
      skillScorgeG: [[], Validators.required]
    });
    this.knowledgeScoreG = this._formBuilder.group({
      knowledgeScoreG: [[], Validators.required]
    });

    this.getSkills();
    this.getKnowledges();
  }

  getSkills(): void {
    this.skillService.getSkills()
      .subscribe(skills => this.skills = skills);
  }

  getKnowledges(): void {
    this.knowledgeService.getKnowledges()
      .subscribe(knowledges => this.knowledges = knowledges);
  }

  generateSkills(): void{
    this.addedSkills = this.skillSelection.value['skillSelection'];
    for(let aSkill of this.addedSkills){
      console.log({"skillId":aSkill.id})
    }
  }

  generateKnowledges(): void{
    this.addedKnowledges = this.knowledgeSelection.value['knowledgeSelection'];
    for(let aKnowledge of this.addedKnowledges){
      console.log({"knowledgeId":aKnowledge.id})
    }
  }

  generateSkillScore(): void{
    for(let idSkill of this.addedSkills){
      this.skillScore.push({"skillId":idSkill.id, "score":Number((<HTMLInputElement>document.getElementById(idSkill.id.toString())).value)})
    }

  }

  generateKnowledgeScore(): void{
    for(let idKnowledge of this.knowledges){
      this.knowledgeScore.push({"knowledgeId":idKnowledge.id,"score":Number((<HTMLInputElement>document.getElementById(idKnowledge.id.toString())).value)});
    }
  }

  addPersonalInformation(): void{
    const name = this.personalInformation.value['name'];
    const lastName = this.personalInformation.value['lastName'];
    const document = this.personalInformation.value['document'];
    const email = this.personalInformation.value['email'];
    const password = this.personalInformation.value['password'];

    this.staffMember.name = name;
    this.staffMember.lastName = lastName;
    this.staffMember.document = document;
    this.staffMember.email = email;
    this.staffMember.password = password;
  }

  saveStaffMember(): void{
    this.staffMemberService.addStaffMember(this.staffMember)
      .subscribe(staffMember => {this.staffMember = staffMember})
  }

}
