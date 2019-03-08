import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {LoglevelComponent} from './loglevel.component';

fdescribe('LoglevelComponent', () => {
  let component: LoglevelComponent;
  let fixture: ComponentFixture<LoglevelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LoglevelComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoglevelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
