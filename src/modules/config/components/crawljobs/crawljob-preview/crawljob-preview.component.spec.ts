import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrawljobPreviewComponent } from './crawljob-preview.component';

describe('CrawljobPreviewComponent', () => {
  let component: CrawljobPreviewComponent;
  let fixture: ComponentFixture<CrawljobPreviewComponent>;

  beforeEach(async(() => {
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
