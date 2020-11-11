import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BrowserconfigDialogComponent } from './browserconfig-dialog.component';

describe('BrowserconfigDialogComponent', () => {
  let component: BrowserconfigDialogComponent;
  let fixture: ComponentFixture<BrowserconfigDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BrowserconfigDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrowserconfigDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
