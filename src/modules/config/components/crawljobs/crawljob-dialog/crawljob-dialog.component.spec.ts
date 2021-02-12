import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CrawljobDialogComponent } from './crawljob-dialog.component';

describe('CrawljobDialogComponent', () => {
  let component: CrawljobDialogComponent;
  let fixture: ComponentFixture<CrawljobDialogComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CrawljobDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrawljobDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
