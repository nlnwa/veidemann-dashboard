import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PolitenessconfigMultiDialogComponent } from './politenessconfig-multi-dialog.component';

describe('PolitenessconfigMultiDialogComponent', () => {
  let component: PolitenessconfigMultiDialogComponent;
  let fixture: ComponentFixture<PolitenessconfigMultiDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PolitenessconfigMultiDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PolitenessconfigMultiDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
