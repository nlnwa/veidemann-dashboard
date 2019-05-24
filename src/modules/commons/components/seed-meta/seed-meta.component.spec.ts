import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {SeedMetaComponent} from './seed-meta.component';

describe('SeedMetaComponent', () => {
  let component: SeedMetaComponent;
  let fixture: ComponentFixture<SeedMetaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SeedMetaComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeedMetaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
