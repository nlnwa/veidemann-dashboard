import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {MaterialModule} from '../../../commons/material.module';
import {BaseListComponent} from '../../../commons/components';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';

describe('BaseListComponent', () => {
  let component: BaseListComponent;
  let fixture: ComponentFixture<BaseListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BaseListComponent],
      imports: [MaterialModule, NoopAnimationsModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BaseListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
