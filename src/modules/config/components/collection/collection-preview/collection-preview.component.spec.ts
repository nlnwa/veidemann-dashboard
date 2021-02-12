import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CollectionPreviewComponent } from './collection-preview.component';

describe('CollectionPreviewComponent', () => {
  let component: CollectionPreviewComponent;
  let fixture: ComponentFixture<CollectionPreviewComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CollectionPreviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CollectionPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
