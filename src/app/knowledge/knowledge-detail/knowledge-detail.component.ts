import {Component, Input, OnInit} from '@angular/core';
import {Skill} from "../../skill/Skill";
import {ActivatedRoute} from "@angular/router";
import {Location} from "@angular/common";
import {KnowledgeServiceService} from "../service/knowledge-service.service";

@Component({
  selector: 'app-knowledge-detail',
  templateUrl: './knowledge-detail.component.html',
  styleUrls: ['./knowledge-detail.component.css']
})
export class KnowledgeDetailComponent implements OnInit {

  @Input() knowledge: Skill;

  constructor(
    private route: ActivatedRoute,
    private knowledgeService: KnowledgeServiceService,
    private location: Location
  ) { }

  ngOnInit() {
    this.getSkill();
  }

  getSkill(){
    const id = this.route.snapshot.paramMap.get('id');
    this.knowledgeService.getKnowledge(id)
      .subscribe(knowledge => this.knowledge = knowledge);
  }

}
