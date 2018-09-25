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
import {MatSnackBar} from "@angular/material";

@Component({
  selector: 'app-project-component',
  templateUrl: './project-component.component.html',
  styleUrls: ['./project-component.component.css']
})
export class ProjectComponentComponent implements OnInit {
  @Input() project: Project;


  /*Valores del proyecto, estos valores son tomados cuando se edita o se crea un nuevo
  * proyecto
  * */
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

  /*variables para el control y flujo del html*/
  public idMap: boolean; //Indica si se envio un id por medio del url
  public editing: boolean = false; //indica si se esta editiando o no
  public showing: boolean = false; // Indica si se esta mostando el resultado de la edicion o creación

  /*Formgroup necesarios para el control de los stepper*/
  public skillSelection: FormGroup; //Seleccion de nuevas habilidades necesarias en el proyecto
  public knowledgeSelection: FormGroup; //Seleccion de nuevos conocimeintos necesatios en el proyecto
  public skillScoreG: FormGroup; //Ingreso de los puntajes de las nuevas habilidades necesarios
  public knowledgeScoreG: FormGroup; //Ingreso de los puntajes de los nuevos conocimientos necesarios

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

  /*Indica si es posible o no eliminar skills o knowledges de los proyectos*/
  public canDeleteSkill: boolean = true;
  public canDeleteKnowledge: boolean = true;


  constructor(private route: ActivatedRoute,
              private projectService: ProjectServiceService,
              private skillService: SkillServiceService,
              private knowledgeService: KnowledgeServiceService,
              private _formBuilder: FormBuilder,
              public snackBar: MatSnackBar
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
  }

  /**
   * getProject se divide en dos fases:
   * Cuando se recibe un id por medio del url y este es igual a null, entonces se creara un proyecto nuevo
   * Cuando se recibe un id por medio del url y este es diferente de null entonces se mostrara la informacipn
   * del proyecto con esa id, el cual se obtiene por medio del servicio getProject(id)
   */
  getProject(): void {
    const id = this.route.snapshot.paramMap.get('id');
    /*Si no hay id se esta creando un proyecto nuevo*/
    if (id == null) {
      this.idMap = false;

      /*Control de fase "mostrar" (feedback), si el resultado final se esta mostrando al usuario entonces 
      no se debe estar en modo editando por lo tanto si se es un proyecto nuevo y no se esta mostrando, se debe estar 
      en modo editando*/
      if(!this.showing) {
        this.editing = true;
      }

      this.project = new Project();
      this.project.name = this.name;
      this.project.neededSkills = this.newSkillScore;
      this.project.neededKnowledges = this.newKnowledgesScore;
      this.project.startDate = this.newStartDate;
      this.project.endDate = this.newEndDate;
      this.getSkills();
      this.getKnowledges();
      /*Control de fase "mostrar" (feedback), si el proyecto nuevo se esta mostrando al usuario se debe asegurar que 
      * se muestren tambien las habilidades y conocimientos que le agrego al proyecto*/
      if(this.showing){
        this.skillScore = this.project.neededSkills;
        this.knowledgeScore = this.project.neededKnowledges;
        this.generateAll();
      }
    }
    else{
      this.idMap = true;


      /*Se obtiene el proyecto desde el servicio get project y se subsribe a el cuando hay algun cambio*/
      this.projectService.getProject(id).subscribe(project => {
        
        /*Condicional para evitar que cuando se elimine una de las skills o knowledges del proyecto se reinicien todas
        * las variables previamente modificadas*/
        if(!this.editing) {
          this.project = project;
          this.name = project.name;

          /*cuando se envio un proyecto para ser mostrado los slide toggle que controlan las fechas son activados
          * para cuando se inicie la edicion del proyecto aparezcan las fechas del proyecto para ser editadas
          * cuando los slide toggle estan en falso las fechas se ponen en null*/
          if(!(this.project.startDate == null)) {
            this.slideStart = true;
            this.newStartDate = new Date(project.startDate);
          }
          else{
            this.slideStart = false;
            this.newStartDate = new Date();
          }

          if(!(this.project.endDate==null)) {
            this.slideEnd = true;
            this.newEndDate = new Date(project.endDate);
          }
          else{
            this.slideStart = false;
            this.newEndDate = new Date();
          }


        }

        this.skillScore = project.neededSkills;
        this.knowledgeScore = project.neededKnowledges;

        /*Condicionales para controlar la posibilidad de dejar un proyecto con skills y knowledges vacias
         *cuando solo queda una skill o una habilidad se deshabilita el boton delete
         */
        if(this.skillScore.length<=1){
          this.canDeleteSkill = false;
        }
        if(this.knowledgeScore.length<=1){
          this.canDeleteKnowledge = false;
        }
        this.getSkills();
        this.getKnowledges();
        this.generateAll();
      });
    }
  }

  /**Habilita la edicion del proyecto en el html
   */
  editProject():void {
    this.editing = true;
    this.showing = false;
  }

  /**Habilita mostrar el producto final y lo guarda*/
  saveAndShowProject():void{

    /*Se revisa que se cumplan los requisitos de creacion y modificacion del proyecto*/
    if(this.reviewRequirements()) {

      /*Si el usuario esta creando un proyecto nuevo o si desea agregar nuevas skills o knowledges se deben crear las
      skillScore y los knowledgeScore*/
      if (this.slideSkill || !this.idMap) {
        this.generateSkillScore();
      }
      if (this.slideKnowledge || !this.idMap) {
        this.generateKnowledgeScore();
      }

      /**Si se esta modificando un proyecto*/
      if (this.idMap) {
        this.showing = true;
        this.editing = false;
        /*Se revisa si los slide toggle de las fechas estan desactivados, si lo estan
        * entonces la fecha respectiva es cambiada por un null, de lo contrario se le agregara
        * la fecha nueva, la cual puede ser tambien la fecha que tenia anteriormente
        */
        if (!this.slideStart) {
          this.project.startDate = null;
        }
        else {
          this.project.startDate = this.newStartDate;
        }
        if (!this.slideEnd) {
          this.project.endDate = null;
        }
        else {
          this.project.endDate = this.newEndDate;
        }

        /*Se crea un lista de nuevas SkillScore y se une con las skillScore que tenia el proyecto anteriormente*/
        let newScoreSki: SkillScore[] = [];
        for (let skill of this.skillAll) {
          newScoreSki.push({skillId: skill.skillId, score: skill.score})
        }
        /*Se crea un lista de nuevas KnowledgeScore y se une con las knowledgeScore que tenia el proyecto anteriormente*/
        let newScoreKnw: KnowledgeScore[] = [];
        for (let knowledge of this.knowledgeAll) {
          newScoreKnw.push({knowledgeId: knowledge.knowledgeId, score: knowledge.score})
        }

        /*Se cambia los valores del proyecto por los valores en las variables del formulario*/
        this.project.name = this.name;
        this.project.neededSkills = newScoreSki.concat(this.newSkillScore);
        this.project.neededKnowledges = newScoreKnw.concat(this.newKnowledgesScore);


        /*Se invoca la funcion actualizar proyecto*/
        this.updateProject();

      }
      /**Si se esta creando un proyecto nuevo*/
      else {

        this.showing = true;
        this.editing = false;

        this.project.name = this.name;
        this.project.neededSkills = this.newSkillScore;
        this.project.neededKnowledges = this.newKnowledgesScore;
        this.project.startDate = this.newStartDate;
        this.project.endDate = this.newEndDate;
        /*Se invoca la funcion agregar proyecto*/
        this.addProject();

      }
    }

  }

  /**
   * Invoca al servicio updateProject() para actualizar el proyecto con la id recibida por la URL
   */
  updateProject():void{

    this.projectService.updateProject(this.project).
    subscribe(project => this.ngOnInit())

  }

  /**
   * Invoca al servicio addProject() para agregar un nuevo proyecto con los valores ingresados por el usuario
   */
  addProject():void{

    this.projectService.addProject(this.project)
      .subscribe(project => {this.ngOnInit()
      });
  }

  /**
   * Genera las Skills y Knowledges del proyecto con su respectivo id, nombre y score
   *
   */
  generateAll():void{
    this.skillService.getSkills().subscribe(skills => {
      /*se toman todas las skills registradas en el sistema y se itera por cada una para comparar
      * su id con las skills del proyecto, de esta forma se puede construir una skill que tenga id, nombre y score
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
      * su id con los knowledges del proyecto, de esta forma se puede construir un knowledge que tenga id, nombre y score
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
      .subscribe(skills => {
        /*Cuando se recibe un proyecto se controla que no se puedan agregar skills que ya esten en el proyecto*/
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
        /*cuando no se recibe un proyecto se pueden seleccionar todas las skills registradas en el sistema*/
        else {
          this.skills = skills
        }
        });
  }

  /**
   * Invoke the service getKnowledge in order to take all the register knowledge in the system
   */
  getKnowledges(): void {
    this.knowledgeService.getKnowledges()
      .subscribe(knowledges => {
        /*Cuando se recibe un proyecto se controla que no se puedan agregar skills que ya esten en el proyecto*/
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
        /*cuando no se recibe un proyecto se pueden seleccionar todas las skills registradas en el sistema*/
        else {
          this.knowledges = knowledges
        }
      });
  }

  /**
   * take the event of the slide of the start date
   */
  slideStartChange():void{
    this.slideStart = !this.slideStart;
  }

  /**
   * take the event of the slide of the end date
   */
  slideEndChange():void{
    this.slideEnd = !this.slideEnd;
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

  /**
   * Delete a skill of the project with the id provided by the url
   * @param id skill id
   */
  deleteSkill(id: string):void{
    let newSkillScore: SkillScore[] = [];
    for(let skill of this.skillScore){
      if(!(skill.skillId.toString() == id)){
        newSkillScore.push(skill)
      }
    }
    this.project.neededSkills = newSkillScore;
    this.projectService.updateProject(this.project).subscribe(project => this.ngOnInit());
  }

  /**
   * Delete a knowledge of the project with the id provided by the url
   * @param id knowledge id
   */
  deleteKnowledge(id: string):void{
    let newKmowledgeScore: KnowledgeScore[] = [];
    for(let knowledge of this.knowledgeScore){
      if(!(knowledge.knowledgeId.toString() == id)){
        newKmowledgeScore.push(knowledge)
      }
    }
    this.project.neededKnowledges = newKmowledgeScore;
    this.projectService.updateProject(this.project).subscribe(project => this.ngOnInit());

  }


  /**
   * Review if the new project have all the requirements like have skill, knowledge and name
   * @return return true if have all requirements and false if don´t
   */
  reviewRequirements(): boolean {
    let message: string = '';
    let review: boolean = true;

    if (this.name.trim().length == 0) {
        message += 'The project must have name, \n';
        review = false;
    }

      if ((this.neededSkills == undefined && !this.idMap)  || (this.neededSkills == undefined && this.slideSkill)) {
        message += 'You have to register at least one needed skill, \n';
        review = false;
      }
      if ((this.neededKnowledges == undefined && !this.idMap)  || (this.neededKnowledges == undefined && this.slideKnowledge)) {
        message += 'You have to register at least one needed knowledge \n';
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
