import { Component, OnInit } from '@angular/core';

import { Skill } from '../Skill';
import { SkillServiceService } from '../service/skill-service.service';

@Component({
  selector: 'app-create-skill',
  templateUrl: './create-skill.component.html',
  styleUrls: ['./create-skill.component.css']
})
export class CreateSkillComponent implements OnInit {

  skills: Skill[];

  skill: Skill = {
    id:'',
    name:''
  };

  constructor(private skillService: SkillServiceService) { }

  ngOnInit() {
    this.getSkills();
  }

  getSkills(): void {
    this.skillService.getSkills()
      .subscribe(skills => this.skills = skills);
  }

  saveSkill(): void{
    if (!this.skill.name) { return; }
    this.skillService.addSkill(this.skill)
      .subscribe(skill => {
        this.skills.push(skill);
        this.skill = {
          id:'',
          name:'',
        };
    });
  }

}
