import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateStaffmemberComponent } from './create-staffmember.component';

describe('CreateStaffmemberComponent', () => {
  let component: CreateStaffmemberComponent;
  let fixture: ComponentFixture<CreateStaffmemberComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateStaffmemberComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateStaffmemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
