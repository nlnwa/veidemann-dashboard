import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { RolemappingMultiDialogComponent } from './rolemapping-multi-dialog.component';

describe('RolemappingMultiDialogComponent', () => {
  let component: RolemappingMultiDialogComponent;
  let fixture: ComponentFixture<RolemappingMultiDialogComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ RolemappingMultiDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RolemappingMultiDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
