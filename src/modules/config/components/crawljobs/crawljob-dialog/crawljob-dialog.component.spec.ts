import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrawljobDialogComponent } from './crawljob-dialog.component';

describe('CrawljobDialogComponent', () => {
  let component: CrawljobDialogComponent;
  let fixture: ComponentFixture<CrawljobDialogComponent>;

  beforeEach(async(() => {
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
