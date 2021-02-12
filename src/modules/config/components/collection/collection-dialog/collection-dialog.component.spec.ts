import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CollectionDialogComponent } from './collection-dialog.component';

describe('CollectionDialogComponent', () => {
  let component: CollectionDialogComponent;
  let fixture: ComponentFixture<CollectionDialogComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CollectionDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CollectionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
