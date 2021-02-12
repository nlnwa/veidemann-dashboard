import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { BrowserscriptPreviewComponent } from './browserscript-preview.component';

describe('BrowserscriptPreviewComponent', () => {
  let component: BrowserscriptPreviewComponent;
  let fixture: ComponentFixture<BrowserscriptPreviewComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ BrowserscriptPreviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrowserscriptPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
