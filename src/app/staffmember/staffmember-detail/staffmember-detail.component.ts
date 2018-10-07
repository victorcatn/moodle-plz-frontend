import {Component, Input, OnInit} from '@angular/core';
import {StaffMember} from '../StaffMember';
import {StaffMemberService} from '../service/staffmember.service';
import {ActivatedRoute} from '@angular/router';
import {SkillServiceService} from '../../skill/service/skill-service.service';
import {KnowledgeServiceService} from '../../knowledge/service/knowledge-service.service';
import {Skill} from '../../skill/Skill';
import {Knowledge} from '../../knowledge/Knowledge';
import {SkillAll} from '../../skill/SkillAll';
import {KnowledgeAll} from '../../knowledge/KnowledgeAll';
import {SkillScore} from '../../skill/SkillScore';
import {KnowledgeScore} from '../../knowledge/KnowledgeScore';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-staffmember-detail',
  templateUrl: './staffmember-detail.component.html',
  styleUrls: ['./staffmember-detail.component.css']
})
export class StaffmemberDetailComponent implements OnInit {

  @Input() staffMember: StaffMember;

  public name: String = '';
  public lastName: String = '';
  public email: String = '';
  public document: String = '';
  public password: String = '';
  public newSkillScore: SkillScore[] = [];
  public newKnowledgesScore: KnowledgeScore[] = [];

  skillScore: SkillScore[];
  knowledgeScore: KnowledgeScore[];

  skillAll: SkillAll[];
  knowledgeAll: KnowledgeAll[];

  public addedSkills: Skill[];
  public addedKnowledges: Knowledge[];

  public skills: Skill[];

  skill: Skill = {
    id:'',
    name:''
  };

  public knowledges: Knowledge[];

  knowledge: Knowledge = {
    id: '',
    name: ''
  };

  public idMap: boolean;
  public editing: boolean = false; 
  public showing: boolean = false;

  skillSelection: FormGroup;
  knowledgeSelection: FormGroup;
  skillScoreG: FormGroup;
  knowledgeScoreG: FormGroup;

  public slideSkill:boolean = false;
  public slideKnowledge:boolean = false;

  constructor(
    private route: ActivatedRoute,
    private staffMemberService: StaffMemberService,
    private skillService: SkillServiceService,
    private knowledgeService: KnowledgeServiceService,
    private _formBuilder: FormBuilder,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
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
    this.getStaffMember()
  }

  getSkills(): void {
    this.skillService.getSkills()
      .subscribe(skills => {
        /*Cuando se recibe un staff member se controla que no se puedan agregar skills que ya esten en el staff member*/
        if(this.idMap){
          let listSkill: Skill[] = [];
          let have:Boolean;
          for(let skill of skills){
            for(let skillS of this.skillScore){
              if(skillS.skillId == skill.id){
                have = true;
              }
            }
            if(!have){
              listSkill.push(skill);
            }
            have = false;
          }
          this.skills = listSkill;
          listSkill = [];
        }
        /*cuando no se recibe un staff member se pueden seleccionar todas las skills registradas en el sistema*/
        else {
          this.skills = skills
        }
        });
  }

  getKnowledges(): void {
    this.knowledgeService.getKnowledges()
      .subscribe(knowledges => {
        /*Cuando se recibe un staff member se controla que no se puedan agregar knowledges que ya esten en el staff member*/
        if(this.idMap){
          let listKnowledge: Knowledge[] = [];
          let have:Boolean;
          for(let knowledge of knowledges){
            for(let knowledgeS of this.knowledgeScore){
              if(knowledgeS.knowledgeId == knowledge.id){
                have = true;
              }
            }
            if(!have){
              listKnowledge.push(knowledge);
            }
            have = false;
          }
          this.knowledges = listKnowledge;
          listKnowledge = [];
        }
        /*cuando no se recibe un staff member se pueden seleccionar todas los knowledges registradas en el sistema*/
        else {
          this.knowledges = knowledges
        }
      });
  }

  getStaffMember(): void{
    const id = this.route.snapshot.paramMap.get('id');
    /*Si no hay id se esta creando un staffmember nuevo*/
    if (id == null) {
      this.idMap = false;

      /*Control de fase "mostrar" (feedback), si el resultado final se esta mostrando al usuario entonces 
      no se debe estar en modo editando por lo tanto si se es un staff member nuevo y no se esta mostrando, se debe estar 
      en modo editando*/
      if(!this.showing) {
        this.editing = true;
      }

      this.staffMember = new StaffMember();
      this.staffMember.name = this.name;
      this.staffMember.lastName = this.lastName;
      this.staffMember.document = this.document;
      this.staffMember.email = this.email;
      this.staffMember.password = this.password;
      this.staffMember.isHumanResourcesManager = false;
      this.staffMember.available = true;
      this.getSkills();
      this.getKnowledges();
      /*Control de fase "mostrar" (feedback), si el staff member nuevo se esta mostrando al usuario se debe asegurar que 
      * se muestren tambien las habilidades y conocimientos que le agrego al staff member*/
      if(this.showing){
        this.skillScore = this.staffMember.skills;
        this.knowledgeScore = this.staffMember.knowledges;
        this.generateAll();
      }
    }
    else{
      this.idMap = true;


      /*Se obtiene el staff member desde el servicio get staffMember y se subsribe a el cuando hay algun cambio*/
      this.staffMemberService.getStaffMember(id).subscribe(staffMember => {
        
        /*Condicional para evitar que cuando se elimine una de las skills o knowledges del staff member se reinicien todas
        * las variables previamente modificadas*/
        if(!this.editing) {
          this.staffMember = staffMember;
          this.name = staffMember.name;
          this.lastName = staffMember.lastName;
          this.email = staffMember.email;
          this.document = staffMember.document;
          this.password = staffMember.password;
        }

        this.skillScore = staffMember.skills;
        this.knowledgeScore = staffMember.knowledges;
        this.getSkills();
        this.getKnowledges();
        this.generateAll();
      });
    }
  }

  generateAll():void{
    this.skillService.getSkills().subscribe(skills => {
      /*se toman todas las skills registradas en el sistema y se itera por cada una para comparar
      * su id con las skills del staff member, de esta forma se puede construir una skill que tenga id, nombre y score
      * y agregarla a lista de skillAll*/
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
      /*se toman todas los knowledges registradas en el sistema y se itera por cada una para comparar
      * su id con los knowledges del staff member, de esta forma se puede construir un knowledge que tenga id, nombre y score
      * y agregarla a lista de knowledgeAll*/
      let knowledgeAllList: KnowledgeAll[] = [];
      for (let knowledge of knowledges) {
        for (let knowledgeS of this.knowledgeScore) {
          if (knowledge.id == knowledgeS.knowledgeId) {
            knowledgeAllList.push({knowledgeId: knowledge.id, name: knowledge.name, score: knowledgeS.score})
          }
        }
      }
      this.knowledgeAll = knowledgeAllList;
      knowledgeAllList = [];
    });
  }

  /*Guarda y muestra el staff member*/
  saveStaffMember():void{

    /*Se revisa que se cumplan los requisitos de creacion y modificacion del staff member*/
    if(this.reviewRequirements()) {

      /*Si el usuario esta creando un staff member nuevo o si desea agregar nuevas skills o knowledges se deben crear las
      skillScore y los knowledgeScore*/
      if (this.slideSkill || !this.idMap) {
        this.generateSkillScore();
      }
      if (this.slideKnowledge || !this.idMap) {
        this.generateKnowledgeScore();
      }

      /**Si se esta modificando un staff member*/
      if (this.idMap) {
        this.showing = true;
        this.editing = false;

        /*Se crea un lista de nuevas SkillScore y se une con las skillScore que tenia el staff member anteriormente*/
        let newScoreSkl: SkillScore[] = [];
        for (let skill of this.skillAll) {
          newScoreSkl.push({skillId: skill.skillId, score: skill.score})
        }
        /*Se crea un lista de nuevas KnowledgeScore y se une con las knowledgeScore que tenia el staff member anteriormente*/
        let newScoreKnw: KnowledgeScore[] = [];
        for (let knowledge of this.knowledgeAll) {
          newScoreKnw.push({knowledgeId: knowledge.knowledgeId, score: knowledge.score})
        }

        /*Se cambia los valores del staff member por los valores en las variables del formulario*/
        this.staffMember.name = this.name;
        this.staffMember.lastName = this.lastName;
        this.staffMember.document = this.document;
        this.staffMember.email = this.email;
        this.staffMember.password = this.password;
        this.staffMember.skills = newScoreSkl.concat(this.newSkillScore);
        this.staffMember.knowledges = newScoreKnw.concat(this.newKnowledgesScore);


        /*Se invoca la funcion actualizar staff member*/
        this.updateStaffMember();

      }
      /**Si se esta creando un staff member nuevo*/
      else {

        this.showing = true;
        this.editing = false;

        this.staffMember.name = this.name;
        this.staffMember.lastName = this.lastName;
        this.staffMember.document = this.document;
        this.staffMember.email = this.email;
        this.staffMember.password = this.password;
        this.staffMember.skills = this.newSkillScore;
        this.staffMember.knowledges = this.newKnowledgesScore;
        /*Se invoca la funcion agregar staff member*/
        this.addStaffMember();

      }
    }

  }

  /**
   * Invoca al servicio updateStaffMember() para actualizar el staff member con la id recibida por la URL
   */
  updateStaffMember():void{
    this.staffMemberService.updateStaffMember(this.staffMember).
    subscribe(staffMember => this.ngOnInit())
  }

  /**
   * Invoca al servicio addStaffMember() para agregar un nuevo staff member con los valores ingresados por el usuario
   */
  addStaffMember():void{
    this.staffMemberService.addStaffMember(this.staffMember)
      .subscribe(staffMember => {this.ngOnInit()
      });
  }

  generateSkillScore(): void{
    for(let idSkill of this.addedSkills){
      this.newSkillScore.push({"skillId":idSkill.id, "score":Number((<HTMLInputElement>document.getElementById(idSkill.id.toString())).value)})
    }
  }

  generateSkills(): void{
    this.addedSkills = this.skillSelection.value['skillSelection'];
    for(let aSkill of this.addedSkills){
      console.log({"skillId":aSkill.id})
    }
  }

  generateKnowledgeScore(): void{
    for(let idKnowledge of this.addedKnowledges){
      this.newKnowledgesScore.push({"knowledgeId":idKnowledge.id,"score":Number((<HTMLInputElement>document.getElementById(idKnowledge.id.toString())).value)});
    }
  }

  generateKnowledges(): void{
    this.addedKnowledges = this.knowledgeSelection.value['knowledgeSelection'];
    for(let aKnowledge of this.addedKnowledges){
      console.log({"knowledgeId":aKnowledge.id})
    }
  }

  /**
   * take the event of the slide of the add new skill
   */
  slideSkillChange():void{
    this.slideSkill = !this.slideSkill;
  }

  /**
   * take the event of the slide of the add new knowledge
   */
  slideKnowledgeChange():void{
    this.slideKnowledge = !this.slideKnowledge;
  }

  /**Habilita la edicion del staff member en el html
   */
  editStaffMember():void {
    this.editing = true;
    this.showing = false;
  }

  /**
   * Review if the new staff member have all the requirements like have skill, knowledge and name
   * @return return true if have all requirements and false if don´t
   */
  reviewRequirements(): boolean {
    let message: string = '';
    let review: boolean = true;

    if (this.name.trim().length == 0) {
        message += 'The staff member must have a name, \n';
        review = false;
    }

    if (this.lastName.trim().length == 0) {
      message += 'The staff member must have a last name, \n';
      review = false;
    }

    if (this.email.trim().length == 0) {
      message += 'The staff member must have a email, \n';
      review = false;
    }

    if (this.document.trim().length == 0) {
      message += 'The staff member must have a document, \n';
      review = false;
    }

    if (this.password.trim().length == 0) {
      message += 'The staff member must have a password, \n';
      review = false;
    }

    if (!review) {
      this.openSnackBar(message, "Accept")
    }

    return review;

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

}
