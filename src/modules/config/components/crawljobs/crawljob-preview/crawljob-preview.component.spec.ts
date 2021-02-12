import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CrawljobPreviewComponent } from './crawljob-preview.component';

describe('CrawljobPreviewComponent', () => {
  let component: CrawljobPreviewComponent;
  let fixture: ComponentFixture<CrawljobPreviewComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CrawljobPreviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrawljobPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
