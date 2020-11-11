import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrawlconfigMultiDialogComponent } from './crawlconfig-multi-dialog.component';

describe('CrawlconfigMultiDialogComponent', () => {
  let component: CrawlconfigMultiDialogComponent;
  let fixture: ComponentFixture<CrawlconfigMultiDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrawlconfigMultiDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrawlconfigMultiDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
