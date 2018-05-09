import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {WarcStatusListComponent} from './warcstatus-list.component';

describe('WarcstatusListComponent', () => {
  let component: WarcStatusListComponent;
  let fixture: ComponentFixture<WarcStatusListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [WarcStatusListComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WarcStatusListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
