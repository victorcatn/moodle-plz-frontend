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
import {Group} from "../../group/Group";


@Component({
  selector: 'app-project-creation',
  templateUrl: './project-creation.component.html',
  styleUrls: ['./project-creation.component.css']
})
export class ProjectCreationComponent implements OnInit {


  public skillSelection: FormGroup;
  public knowledgeSelection: FormGroup;
  public skillScoreG: FormGroup;
  public knowledgeScoreG: FormGroup;

  public slideStart:boolean = false;
  public slideEnd:boolean = false;

  public neededSkills: Skill[];
  public neededKnowledges: Knowledge[];

  public skills: Skill[];
  public knowledges: Knowledge[];


  private project: Project = new Project();

  public _projectName: String = "";
  public _startDate: Date = new Date();
  public _endDate:Date = new Date;
  private skillScore: SkillScore[] = new Array();
  private knowledgesScore: KnowledgeScore[] = new Array();


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

  /**
   * Invoke the service save project in order to do a http request post
   * assign in project all the values recopiled in the form, if the startDate or endDate are
   * desactivated then assign null in these variables
   */
  saveProject():void{
    this.project.name=this._projectName;

    if(this.slideStart){this.project.startDate=this._startDate;
    }else{this.project.startDate = null
    }

    if(this.slideEnd){this.project.endDate=this._endDate;
    }else{this.project.endDate=null;
    }
    this.project.neededSkills = this.skillScore;
    this.project.neededKnowledges = this.knowledgesScore;
    this.project.assignedGroupId = null;


    this.projectService.addProject(this.project)
      .subscribe(project => {
        this.project = new Project();
      });
  }

  /**
   * Take the elements input on the HTML by its code and take its value
   * in order to do a object skillScore, that is the needed skill with the required score
   */
  generateSkillScore(): void{
    for(let idSkill of this.neededSkills){
      this.skillScore.push({"skillId":idSkill.id,"score":Number((<HTMLInputElement>document.getElementById(idSkill.id.toString())).value)});
    }

  }
  /**
   * Take the elements input on the HTML by its code and take its value
   * in order to do a object KnowledgesScore that is the needed knowledge with the required score
   */
  generateKnowledgeScore(): void{
    for(let idKnowledge of this.neededKnowledges){
      this.knowledgesScore.push({"knowledgeId":idKnowledge.id,"score":Number((<HTMLInputElement>document.getElementById(idKnowledge.id.toString())).value)});
    }

  }

  /**
   * Take the values on the skillSelection form and take that like the needed skills but without score
   */
  generateNeededSkills(): void{
    this.neededSkills = this.skillSelection.value['skillSelection'];
  }

  /**
   * Take the values on the skillSelection form and take that like the needed knowldegs but without score
   */
  generateNeededKnowledges(): void{
    this.neededKnowledges = this.knowledgeSelection.value['knowledgeSelection'];
  }

  /**
   * Invoke the service getSkills in order to take all the register skills in the system
   */
  getSkills(): void {
    this.skillService.getSkills()
      .subscribe(skills => this.skills = skills);
  }

  /**
   * Invoke the service getKnowledge in order to take all the register knowledge in the system
   */
  getKnowledges(): void {
    this.knowledgeService.getKnowledges()
      .subscribe(knowledges => this.knowledges = knowledges);
  }

  /**
   * take the event of the slide of the start date
   */
  slideStartChange():void{
    if(this.slideStart){
      this.slideStart = false;
    }
    else{
      this.slideStart = true;
    }
  }

  /**
   * take the event of the slide of the end date
   */
  slideEndChange():void{
    if(this.slideEnd){
      this.slideEnd = false;
    }
    else{
      this.slideEnd = true;
    }
  }


}
