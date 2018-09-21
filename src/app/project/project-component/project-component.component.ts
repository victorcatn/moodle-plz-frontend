import {Component, Input, OnInit} from '@angular/core';
import {Project} from "../Project";
import {ProjectServiceService} from "../service/project-service.service";
import {ActivatedRoute} from "@angular/router";
import {SkillAll} from "../../skill/SkillAll";
import {KnowledgeAll} from "../../knowledge/KnowledgeAll";
import {SkillServiceService} from "../../skill/service/skill-service.service";
import {KnowledgeServiceService} from "../../knowledge/service/knowledge-service.service";
import {SkillScore} from "../../skill/SkillScore";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Skill} from "../../skill/Skill";
import {Knowledge} from "../../knowledge/Knowledge";
import {KnowledgeScore} from "../../knowledge/KnowledgeScore";

@Component({
  selector: 'app-project-component',
  templateUrl: './project-component.component.html',
  styleUrls: ['./project-component.component.css']
})
export class ProjectComponentComponent implements OnInit {
  @Input() project: Project;


  /*Valores del proyecto*/
  public name: String ='';
  public newSkillScore: SkillScore[] = [];
  public newKnowledgesScore: KnowledgeScore[] = [];
  public newStartDate: Date = new Date();
  public newEndDate: Date = new Date();




  /*Obtienen el valor de neededSkills y neededKnowledges del proyecto cuando
   *se envia un id por medio del url
   */
  skillScore: SkillScore[];
  knowledgeScore: KnowledgeScore[];

  /*Obtienen el id y el score de SkillScore y knowledgeScore, y el nombre lo obtienen
   *en la funcion generateAll()
   */
  skillAll: SkillAll[];
  knowledgeAll: KnowledgeAll[];

  /*Seran las nuevas skills y knowledges necesarias del proyecto
   *Nota: Solo son las skills y knowledges no las SkillScore o KnowledgeScore
   *      por lo tanto estas solo se usan para crearlas
   */
  public neededSkills: Skill[];
  public neededKnowledges: Knowledge[];

  /*Obtienen todas las skills y knowledges registradas en el sistema para mostrarlas como
   *eleccion si se desea agregar nuevas skills o knowledges
   */
  public skills: Skill[];
  public knowledges: Knowledge[];





  public idMap: boolean; //Indica si se envio un id por medio del url
  public editing: boolean = false; //indica si se esta editiando o no
  public showing: boolean = false; // Indica si se esta mostando el resultado de la edicion o creación

  /*Formgroup necesarios para el control de los stepper
   */
  public skillSelection: FormGroup;
  public knowledgeSelection: FormGroup;
  public skillScoreG: FormGroup;
  public knowledgeScoreG: FormGroup;

  /*Indica si se le agregara o no fecha de inicio o fecha de finalizacion del proyecto
   *Si el slide toggle esta en falso la fecha respectiva se pondra en null
   */
  public slideStart:boolean = false;
  public slideEnd:boolean = false;

  /*Indica si se le agregaran o no nuevas skill o nuevos knowledges
   *si el slide respectivo esta en false entonces no se muestra el stepper para agregar nuevas necesidades
   *si esta en true se muestra el stepper para agregar habilidades nuevas
   */
  public slideSkill:boolean = false;
  public slideKnowledge:boolean = false;


  constructor(private route: ActivatedRoute,
              private projectService: ProjectServiceService,
              private skillService: SkillServiceService,
              private knowledgeService: KnowledgeServiceService,
              private _formBuilder: FormBuilder
  ) { }

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
    this.getProject();
    this.getSkills();
    this.getKnowledges();
  }


  getProject(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id == null) {
      this.idMap = false;
      if(!this.showing) {
        this.editing = true;
      }

      this.project = new Project();
      this.project.name = this.name;
      this.project.neededSkills = this.newSkillScore;
      this.project.neededKnowledges = this.newKnowledgesScore;
      this.project.startDate = this.newStartDate;
      this.project.endDate = this.newEndDate;
      if(this.showing){
        this.skillScore = this.project.neededSkills;
        this.knowledgeScore = this.project.neededKnowledges;
        this.generateAll();
      }
    }
    else{
      this.idMap = true;
      this.slideStart = true;
      this.slideEnd = true;

      this.projectService.getProject(id).subscribe(project => {
        if(!this.editing) {
          this.project = project;
          this.name = project.name;

          this.newStartDate = project.startDate;
          this.newEndDate = project.endDate;
        }

        this.skillScore = project.neededSkills;
        this.knowledgeScore = project.neededKnowledges;
        this.generateAll();
      });
    }
  }

  generateAll():void{
    this.skillService.getSkills().subscribe(skills => {
      let skillAllList: SkillAll[] = [];
      for (let skill of skills) {
        for (let skillS of this.skillScore) {
          if (skill.id == skillS.skillId) {
            skillAllList.push({skillId: skill.id, name: skill.name, score: skillS.score})
          }
        }
      }
      this.skillAll = skillAllList;
      skillAllList = [];
    });

    this.knowledgeService.getKnowledges().subscribe(knowledges => {
      let knowledgeAllList: KnowledgeAll[] = [];
      for (let knowledge of knowledges) {
        for (let knowledgeS of this.knowledgeScore) {
          if (knowledge.id == knowledgeS.knowledgeId) {
            knowledgeAllList.push({knowledgeId: knowledge.id, name: knowledge.name, score: knowledgeS.score})
          }
        }
      }
      this.knowledgeAll = knowledgeAllList
      knowledgeAllList = []
    });
  }

  editProject():void {
    this.editing = true;
    this.showing = false;
  }

  showChanguesInProject():void{
    this.showing = true;
    this.editing = false;
    if(this.slideSkill) {
      this.generateSkillScore();
    }
    if(this.slideKnowledge) {
      this.generateKnowledgeScore();
    }

    if(this.idMap) {
      if(!this.slideStart){
        this.project.startDate = null;
      }
      else{
        this.project.startDate = this.newStartDate;
      }
      if(!this.slideEnd){
        this.project.endDate = null;
      }
      else{
        this.project.endDate = this.newEndDate;
      }

      let newScoreSki: SkillScore[] = []
      for(let skill of this.skillAll){
        newScoreSki.push({skillId:skill.skillId, score:skill.score})
      }
      let newScoreKnw: KnowledgeScore[] = []
      for(let knowledge of this.knowledgeAll){
        newScoreKnw.push({knowledgeId:knowledge.knowledgeId, score:knowledge.score})
      }

      this.project.name = this.name;
      this.project.neededSkills = newScoreSki.concat(this.newSkillScore);
      this.project.neededKnowledges = newScoreKnw.concat(this.newKnowledgesScore);


      this.updateProject();

    }else{
      this.ngOnInit();
      this.addProject();
    }
  }

  updateProject():void{

    this.projectService.updateProject(this.project).
    subscribe(project => this.ngOnInit())

  }

  addProject():void{

    this.projectService.addProject(this.project)
      .subscribe(project => {this.ngOnInit()
      });
  }

  /**
   * Take the elements input on the HTML by its code and take its value
   * in order to do a object skillScore, that is the needed skill with the required score
   */
  generateSkillScore(): void{
    for(let idSkill of this.neededSkills){
      this.newSkillScore.push({"skillId":idSkill.id,"score":Number((<HTMLInputElement>document.getElementById(idSkill.id.toString())).value)});
    }

  }
  /**
   * Take the elements input on the HTML by its code and take its value
   * in order to do a object KnowledgesScore that is the needed knowledge with the required score
   */
  generateKnowledgeScore(): void{
    for(let idKnowledge of this.neededKnowledges){
      this.newKnowledgesScore.push({"knowledgeId":idKnowledge.id,"score":Number((<HTMLInputElement>document.getElementById(idKnowledge.id.toString())).value)});
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

  slideSkillChange():void{
    if(this.slideSkill){
      this.slideSkill = false;
    }
    else{
      this.slideSkill = true;
    }
  }

  slideKnowledgeChange():void{
    if(this.slideKnowledge){
      this.slideKnowledge = false;
    }
    else{
      this.slideKnowledge = true;
    }
  }

  deleteSkill(id: string):void{
    let newSkillScore: SkillScore[] = []
    for(let skill of this.skillScore){
      if(!(skill.skillId.toString() == id)){
        newSkillScore.push(skill)
      }
    }
    this.project.neededSkills = newSkillScore;
    this.projectService.updateProject(this.project).subscribe(project => this.ngOnInit());
  }
  deleteKnowledge(id: string):void{
    let newKmowledgeScore: KnowledgeScore[] = []
    for(let knowledge of this.knowledgeScore){
      if(!(knowledge.knowledgeId.toString() == id)){
        newKmowledgeScore.push(knowledge)
      }
    }
    this.project.neededKnowledges = newKmowledgeScore;
    this.projectService.updateProject(this.project).subscribe(project => this.ngOnInit());

  }

}
