import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffmemberListComponent } from './staffmember-list.component';

describe('StaffmemberListComponent', () => {
  let component: StaffmemberListComponent;
  let fixture: ComponentFixture<StaffmemberListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StaffmemberListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StaffmemberListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
