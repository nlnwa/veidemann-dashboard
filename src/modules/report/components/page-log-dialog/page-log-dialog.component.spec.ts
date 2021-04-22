import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageLogDialogComponent } from './page-log-dialog.component';

describe('PageLogDialogComponent', () => {
  let component: PageLogDialogComponent;
  let fixture: ComponentFixture<PageLogDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageLogDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PageLogDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
