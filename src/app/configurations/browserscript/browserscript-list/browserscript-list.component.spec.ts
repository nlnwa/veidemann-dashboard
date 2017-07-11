import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BrowserscriptListComponent } from './browserscript-list.component';

describe('BrowserscriptListComponent', () => {
  let component: BrowserscriptListComponent;
  let fixture: ComponentFixture<BrowserscriptListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BrowserscriptListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrowserscriptListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
