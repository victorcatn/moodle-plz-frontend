import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CidimageComponent} from './cidimage.component';

describe('CidimageComponent', () => {
  let component: CidimageComponent;
  let fixture: ComponentFixture<CidimageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CidimageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CidimageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
