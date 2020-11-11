import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LabelMultiComponent } from './label-multi.component';

describe('LabelMultiComponent', () => {
  let component: LabelMultiComponent;
  let fixture: ComponentFixture<LabelMultiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LabelMultiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LabelMultiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
