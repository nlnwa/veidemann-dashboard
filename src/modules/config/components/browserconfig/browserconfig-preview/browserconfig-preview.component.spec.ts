import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BrowserconfigPreviewComponent } from './browserconfig-preview.component';

describe('BrowserconfigPreviewComponent', () => {
  let component: BrowserconfigPreviewComponent;
  let fixture: ComponentFixture<BrowserconfigPreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BrowserconfigPreviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrowserconfigPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
