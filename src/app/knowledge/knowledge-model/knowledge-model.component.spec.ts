import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KnowledgeModelComponent } from './knowledge-model.component';

describe('KnowledgeModelComponent', () => {
  let component: KnowledgeModelComponent;
  let fixture: ComponentFixture<KnowledgeModelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KnowledgeModelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KnowledgeModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
