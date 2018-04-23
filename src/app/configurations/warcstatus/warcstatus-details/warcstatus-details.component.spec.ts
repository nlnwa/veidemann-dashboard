import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WarcstatusDetailsComponent } from './warcstatus-details.component';

describe('WarcstatusDetailsComponent', () => {
  let component: WarcstatusDetailsComponent;
  let fixture: ComponentFixture<WarcstatusDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WarcstatusDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WarcstatusDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
