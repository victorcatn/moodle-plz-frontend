import {Component, OnInit} from '@angular/core';
import {Project} from "../Project";
import {ActivatedRoute} from "@angular/router";
import {ProjectServiceService} from "../service/project-service.service";
import {SkillScore} from "../../skill/SkillScore";
import {KnowledgeScore} from "../../knowledge/KnowledgeScore";
import {SkillServiceService} from "../../skill/service/skill-service.service";
import {KnowledgeServiceService} from "../../knowledge/service/knowledge-service.service";
import {SkillAll} from "../../skill/SkillAll";
import {KnowledgeAll} from "../../knowledge/KnowledgeAll";

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.css']
})


export class ProjectDetailComponent implements OnInit {
  project: Project;
  skillScore: SkillScore[];
  knowledgeScore: KnowledgeScore[];
  skillAll: SkillAll[];
  knowledgeAll: KnowledgeAll[];



  constructor(
    private route: ActivatedRoute,
    private projectService: ProjectServiceService,
    private skillService: SkillServiceService,
    private knowledgeService: KnowledgeServiceService

    /*private _location: Location*/) {}


  ngOnInit(): void{
    this.getProject()
    this.getSkillNames()
    this.getKnowledgesNames()
  }



  getProject(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.projectService.getProject(id)
      .subscribe(project =>{
        this.project = project;
        this.skillScore = project.neededSkills;
        this.knowledgeScore = project.neededKnowledges;
      });
  }

  getSkillNames():void{
    this.skillService.getSkills().subscribe(skills => {
      let skillAllList: SkillAll[] = [];
      for(let skill of skills){
        for(let skillS of this.skillScore){
          if(skill.id == skillS.skillId){
            skillAllList.push({skillId:skill.id, name:skill.name, score:skillS.score})
          }
        }
      }
      this.skillAll=skillAllList
      console.log(this.skillAll)
      skillAllList = []
    });
  }

  getKnowledgesNames():void{
    this.knowledgeService.getKnowledges().subscribe(knowledges => {
      let knowledgeAllList: KnowledgeAll[] = [];
      for(let knowledge of knowledges){
        for(let knowledgeS of this.knowledgeScore){
          if(knowledge.id == knowledgeS.knowledgeId){
            knowledgeAllList.push({knowledgeId:knowledge.id, name:knowledge.name, score:knowledgeS.score})
          }
        }
      }
      this.knowledgeAll=knowledgeAllList
      console.log(this.knowledgeAll)
      knowledgeAllList = []
    });
  }




}
