import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeedMetaPreviewComponent } from './seed-meta-preview.component';

describe('SeedMetaPreviewComponent', () => {
  let component: SeedMetaPreviewComponent;
  let fixture: ComponentFixture<SeedMetaPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeedMetaPreviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SeedMetaPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
