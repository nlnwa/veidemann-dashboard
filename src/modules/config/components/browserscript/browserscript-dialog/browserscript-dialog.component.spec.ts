import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { BrowserscriptDialogComponent } from './browserscript-dialog.component';

describe('BrowserscriptDialogComponent', () => {
  let component: BrowserscriptDialogComponent;
  let fixture: ComponentFixture<BrowserscriptDialogComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ BrowserscriptDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrowserscriptDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
