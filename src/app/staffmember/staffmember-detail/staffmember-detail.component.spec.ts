import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffmemberDetailComponent } from './staffmember-detail.component';

describe('StaffmemberDetailComponent', () => {
  let component: StaffmemberDetailComponent;
  let fixture: ComponentFixture<StaffmemberDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StaffmemberDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StaffmemberDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
