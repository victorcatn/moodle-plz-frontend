import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateKnowledgeComponent } from './create-knowledge.component';

describe('CreateKnowledgeComponent', () => {
  let component: CreateKnowledgeComponent;
  let fixture: ComponentFixture<CreateKnowledgeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateKnowledgeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateKnowledgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
