import { Component, OnInit } from '@angular/core';
import { Skill } from '../Skill';
import { SkillServiceService } from '../service/skill-service.service';

@Component({
  selector: 'app-skill-model',
  templateUrl: './skill-model.component.html',
  styleUrls: ['./skill-model.component.css']
})
export class SkillModelComponent implements OnInit {

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

  delete(skill: Skill): void {
    this.skills = this.skills.filter(h => h !== skill);
    this.skillService.deleteSkill(skill).subscribe();
  }

}
