import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SeedPreviewComponent } from './seed-preview.component';
import {RouterTestingModule} from '@angular/router/testing';
import {MatDialogModule} from '@angular/material/dialog';
import {CoreTestingModule} from '../../../../core/core.testing.module';

describe('SeedPreviewComponent', () => {
  let component: SeedPreviewComponent;
  let fixture: ComponentFixture<SeedPreviewComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [CoreTestingModule.forRoot(), RouterTestingModule, MatDialogModule],
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
