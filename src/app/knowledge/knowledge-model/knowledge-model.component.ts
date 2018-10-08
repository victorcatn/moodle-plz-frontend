import { Component, OnInit } from '@angular/core';
import { Knowledge } from '../Knowledge';
import { KnowledgeServiceService } from '../service/knowledge-service.service';

@Component({
  selector: 'app-knowledge-model',
  templateUrl: './knowledge-model.component.html',
  styleUrls: ['./knowledge-model.component.css']
})
export class KnowledgeModelComponent implements OnInit {

  knowledges: Knowledge[];

  knowledge: Knowledge = {
    id: '',
    name: ''
  };

  constructor(private knowledgeService: KnowledgeServiceService) { }

  ngOnInit() {
    this.getKnowledges()
  }

  getKnowledges(): void{
    this.knowledgeService.getKnowledges().subscribe(knowledges => this.knowledges = knowledges)
  }

  delete(knowledge: Knowledge): void{
    this.knowledges = this.knowledges.filter(h => h !== knowledge);
    this.knowledgeService.deleteKnowledge(knowledge).subscribe();
  }

}
