import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CrawljobsMultiDialogComponent } from './crawljobs-multi-dialog.component';

describe('CrawljobsMultiDialogComponent', () => {
  let component: CrawljobsMultiDialogComponent;
  let fixture: ComponentFixture<CrawljobsMultiDialogComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CrawljobsMultiDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrawljobsMultiDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
