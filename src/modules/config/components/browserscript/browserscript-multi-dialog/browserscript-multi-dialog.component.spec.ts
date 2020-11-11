import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BrowserscriptMultiDialogComponent } from './browserscript-multi-dialog.component';

describe('BrowserscriptMultiDialogComponent', () => {
  let component: BrowserscriptMultiDialogComponent;
  let fixture: ComponentFixture<BrowserscriptMultiDialogComponent>;

  beforeEach(async(() => {
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
