import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BrowserconfigListComponent } from './browserconfig-list.component';

describe('BrowserconfigListComponent', () => {
  let component: BrowserconfigListComponent;
  let fixture: ComponentFixture<BrowserconfigListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BrowserconfigListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrowserconfigListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
