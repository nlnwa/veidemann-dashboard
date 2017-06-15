import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PolitenessconfigDetailsComponent } from './politenessconfig-details.component';

describe('PolitenessconfigDetailsComponent', () => {
  let component: PolitenessconfigDetailsComponent;
  let fixture: ComponentFixture<PolitenessconfigDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PolitenessconfigDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PolitenessconfigDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
