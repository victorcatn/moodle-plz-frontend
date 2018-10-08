import {Component, Input, OnInit} from '@angular/core';
import {Skill} from '../Skill';
import {SkillServiceService} from '../service/skill-service.service';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';

@Component({
  selector: 'app-edit-skill',
  templateUrl: './edit-skill.component.html',
  styleUrls: ['./edit-skill.component.css']
})
export class EditSkillComponent implements OnInit {

  @Input() skill: Skill;
  name : string;

  constructor(
    private skillService: SkillServiceService,
    private route: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit() {
    this.getSkill()
  }

  getSkill(){
    const id = this.route.snapshot.paramMap.get('id');
    this.skillService.getSkill(id)
    .subscribe(skill => {
      this.skill = skill;
      this.name = skill.name.toString();
    })
  }

  goBack(): void {
    this.location.back();
  }

  save(): void{

    this.skill.name = this.name;
    this.skillService.updateSkill(this.skill)
      .subscribe()
  }

}
