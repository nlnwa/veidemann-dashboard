import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { RolemappingDialogComponent } from './rolemapping-dialog.component';

describe('RolemappingDialogComponent', () => {
  let component: RolemappingDialogComponent;
  let fixture: ComponentFixture<RolemappingDialogComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ RolemappingDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RolemappingDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
