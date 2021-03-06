import { Component, OnInit } from '@angular/core';

import { Skill } from '../Skill';
import { SkillServiceService } from '../service/skill-service.service';
import { Location } from '@angular/common';

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

  constructor(private skillService: SkillServiceService, private location: Location) { }

  ngOnInit() {
    this.getSkills();
  }

  getSkills(): void {
    this.skillService.getSkills()
      .subscribe(skills => this.skills = skills);
  }

  saveSkill(name: string): void{
    name = name.trim();
    if (!name) { return; }
    this.skillService.addSkill({ id:null, name } as Skill)
      .subscribe(skill => {
        this.skills.push(skill);
        });
  }

  goBack(): void{
    this.location.back();
  }

}
