import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PolitenessconfigDialogComponent } from './politenessconfig-dialog.component';

describe('PolitenessconfigDialogComponent', () => {
  let component: PolitenessconfigDialogComponent;
  let fixture: ComponentFixture<PolitenessconfigDialogComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PolitenessconfigDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PolitenessconfigDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
