import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WarcstatusListComponent } from './warcstatus-list.component';

describe('WarcstatusListComponent', () => {
  let component: WarcstatusListComponent;
  let fixture: ComponentFixture<WarcstatusListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WarcstatusListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WarcstatusListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
