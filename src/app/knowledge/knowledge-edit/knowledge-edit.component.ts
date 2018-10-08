import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Location} from "@angular/common";
import {Knowledge} from "../Knowledge";
import {KnowledgeServiceService} from "../service/knowledge-service.service";

@Component({
  selector: 'app-knowledge-edit',
  templateUrl: './knowledge-edit.component.html',
  styleUrls: ['./knowledge-edit.component.css']
})
export class KnowledgeEditComponent implements OnInit {

  @Input() knowledge: Knowledge;
  name : string;

  constructor(
    private knowledgeService: KnowledgeServiceService,
    private route: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit() {
    this.getKnowledge()
  }

  getKnowledge(){
    const id = this.route.snapshot.paramMap.get('id');
    this.knowledgeService.getKnowledge(id)
      .subscribe(knowledge => {
        this.knowledge = knowledge;
        this.name = knowledge.name.toString();
      })
  }

  goBack(): void {
    this.location.back();
  }

  save(): void{
    this.knowledge.name = this.name;
    this.knowledgeService.updateKnowledge(this.knowledge)
      .subscribe()
  }

}
