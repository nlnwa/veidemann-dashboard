import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PolitenessconfigPreviewComponent } from './politenessconfig-preview.component';

describe('PolitenessconfigPreviewComponent', () => {
  let component: PolitenessconfigPreviewComponent;
  let fixture: ComponentFixture<PolitenessconfigPreviewComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PolitenessconfigPreviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PolitenessconfigPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
