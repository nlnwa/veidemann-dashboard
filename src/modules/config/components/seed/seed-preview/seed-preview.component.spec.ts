import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SeedPreviewComponent } from './seed-preview.component';

describe('SeedPreviewComponent', () => {
  let component: SeedPreviewComponent;
  let fixture: ComponentFixture<SeedPreviewComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SeedPreviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeedPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
