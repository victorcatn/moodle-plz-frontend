import { Component, OnInit, Input } from '@angular/core';
import { Skill } from '../Skill';
import { SkillServiceService } from '../service/skill-service.service';
import { ActivatedRoute } from '@angular/router';
import {Location} from '@angular/common';

@Component({
  selector: 'app-skill-detail',
  templateUrl: './skill-detail.component.html',
  styleUrls: ['./skill-detail.component.css']
})
export class SkillDetailComponent implements OnInit {

  @Input() skill: Skill;

  constructor(
    private route: ActivatedRoute,
    private skillService: SkillServiceService,
    private location: Location
  ) { }

  ngOnInit() {
    this.getSkill();
  }

  getSkill(){
    const id = this.route.snapshot.paramMap.get('id');
    this.skillService.getSkill(id)
    .subscribe(skill => this.skill = skill);
  }

}
