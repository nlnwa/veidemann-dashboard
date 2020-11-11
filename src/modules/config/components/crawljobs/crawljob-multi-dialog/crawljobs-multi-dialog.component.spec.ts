import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrawljobsMultiDialogComponent } from './crawljobs-multi-dialog.component';

describe('CrawljobsMultiDialogComponent', () => {
  let component: CrawljobsMultiDialogComponent;
  let fixture: ComponentFixture<CrawljobsMultiDialogComponent>;

  beforeEach(async(() => {
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
