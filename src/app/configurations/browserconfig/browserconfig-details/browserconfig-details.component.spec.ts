import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {BrowserconfigDetailsComponent} from './browserconfig-details.component';

describe('BrowserconfigDetailsComponent', () => {
  let component: BrowserconfigDetailsComponent;
  let fixture: ComponentFixture<BrowserconfigDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BrowserconfigDetailsComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrowserconfigDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
