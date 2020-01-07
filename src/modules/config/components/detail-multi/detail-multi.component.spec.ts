import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailMultiComponent } from './detail-multi.component';

describe('DetailMultiComponent', () => {
  let component: DetailMultiComponent;
  let fixture: ComponentFixture<DetailMultiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailMultiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailMultiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
