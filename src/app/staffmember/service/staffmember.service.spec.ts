import { TestBed } from '@angular/core/testing';

import { StaffmemberService } from './staffmember.service';

describe('StaffmemberService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StaffmemberService = TestBed.get(StaffmemberService);
    expect(service).toBeTruthy();
  });
});
