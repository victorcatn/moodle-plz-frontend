import { TestBed } from '@angular/core/testing';

import { KnowledgeServiceService } from './knowledge-service.service';

describe('KnowledgeServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: KnowledgeServiceService = TestBed.get(KnowledgeServiceService);
    expect(service).toBeTruthy();
  });
});
