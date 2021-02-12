import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MetaPreviewComponent } from './meta-preview.component';

describe('MetaPreviewComponent', () => {
  let component: MetaPreviewComponent;
  let fixture: ComponentFixture<MetaPreviewComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MetaPreviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MetaPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
