import { Component, OnInit } from '@angular/core';
import { Knowledge } from '../Knowledge';
import { KnowledgeServiceService } from '../service/knowledge-service.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-create-knowledge',
  templateUrl: './create-knowledge.component.html',
  styleUrls: ['./create-knowledge.component.css']
})
export class CreateKnowledgeComponent implements OnInit {

  knowledges: Knowledge[];
  knowledge: Knowledge = {
    id: '',
    name: ''
  };

  constructor(private knowledgeService: KnowledgeServiceService, private location: Location) { }

  ngOnInit() {
    this.getKnowledges();
  }

  getKnowledges(): void{
    this.knowledgeService.getKnowledges().subscribe(knowledges => this.knowledges = knowledges)
  }

  saveKnowledge(name: string): void{
    name = name.trim();
    if(!name) {return;}
    this.knowledgeService.addKnowledge({id: null, name} as Knowledge)
      .subscribe(knowledge => {
        this.knowledges.push(knowledge)
      });
  }

  goBack(): void{
    this.location.back();
  }

}
