import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Project} from "../Project";
import {ProjectServiceService} from "../service/project-service.service";
import {KnowledgeServiceService} from "../../knowledge/service/knowledge-service.service";
import {SkillServiceService} from "../../skill/service/skill-service.service";
import {Knowledge} from "../../knowledge/Knowledge";
import {Skill} from "../../skill/Skill";
import {SkillScore} from "../../skill/SkillScore";
import {KnowledgeScore} from "../../knowledge/KnowledgeScore";


@Component({
  selector: 'app-project-creation',
  templateUrl: './project-creation.component.html',
  styleUrls: ['./project-creation.component.css']
})
export class ProjectCreationComponent implements OnInit {

  skillSelection: FormGroup;
  knowledgeSelection: FormGroup;
  skillScoreG: FormGroup;
  knowledgeScoreG: FormGroup;



  project: Project;

  skillScore: SkillScore[] = [];
  knowledgesScore: KnowledgeScore[] = [];

  neededSkills: Skill[];
  neededKnowledges: Knowledge[];

  skills: Skill[];
  knowledges: Knowledge[];

  constructor(
    private projectService: ProjectServiceService,
    private skillService: SkillServiceService,
    private knowledgeService: KnowledgeServiceService,
    private _formBuilder: FormBuilder) { }

  ngOnInit() {
    this.skillSelection = this._formBuilder.group({
      skillSelection: [[], Validators.required]
    });
    this.knowledgeSelection = this._formBuilder.group({
      knowledgeSelection: [[], Validators.required]
    });
    this.skillScoreG = this._formBuilder.group({
      skillScoreG:[[], Validators.required]
    });
    this.knowledgeScoreG = this._formBuilder.group({
      knowledgeScoreG:[[], Validators.required]
    });

    this.getSkills();
    this.getKnowledges
  }

  generateSkillScore(): void{
    for(let idSkill of this.neededSkills){
      this.skillScore.push({"skillId":idSkill.id,"score":Number((<HTMLInputElement>document.getElementById(idSkill.id.toString())).value)});
    }

  }

  generateKnowledgeScore(): void{
    for(let idKnowledge of this.neededKnowledges){
      this.knowledgesScore.push({"knowledgeId":idKnowledge.id,"score":Number((<HTMLInputElement>document.getElementById(idKnowledge.id.toString())).value)});
    }

  }

  generateNeededSkills(): void{
    this.neededSkills = this.skillSelection.value['skillSelection'];
    for(let nSkill of this.neededSkills){
      console.log({"skillId":nSkill.id, "score":null})
    }

  }

  generateNeededKnowledges(): void{
    this.neededKnowledges = this.knowledgeSelection.value['knowledgeSelection'];
  }


  getSkills(): void {
    this.skillService.getSkills()
      .subscribe(skills => this.skills = skills);
  }

  getKnowledges(): void {
    this.knowledgeService.getKnowledges()
      .subscribe(knowledges => this.knowledges = knowledges);
  }


}
