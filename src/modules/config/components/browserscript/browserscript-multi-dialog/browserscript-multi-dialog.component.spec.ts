import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { BrowserscriptMultiDialogComponent } from './browserscript-multi-dialog.component';

describe('BrowserscriptMultiDialogComponent', () => {
  let component: BrowserscriptMultiDialogComponent;
  let fixture: ComponentFixture<BrowserscriptMultiDialogComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ BrowserscriptMultiDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrowserscriptMultiDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
