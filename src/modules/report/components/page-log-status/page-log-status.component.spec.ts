import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {PagelogStatusComponent} from './page-log-status.component';

describe('PagelogStatusComponent', () => {
  let component: PagelogStatusComponent;
  let fixture: ComponentFixture<PagelogStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PagelogStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PagelogStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
