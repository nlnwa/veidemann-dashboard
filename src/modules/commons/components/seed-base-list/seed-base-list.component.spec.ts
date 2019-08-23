import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeedBaseListComponent } from './seed-base-list.component';

describe('SeedBaseListComponent', () => {
  let component: SeedBaseListComponent;
  let fixture: ComponentFixture<SeedBaseListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeedBaseListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeedBaseListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
