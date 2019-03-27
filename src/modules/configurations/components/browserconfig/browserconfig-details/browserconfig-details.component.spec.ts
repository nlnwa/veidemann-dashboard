import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {BrowserConfigDetailsComponent} from './browserconfig-details.component';

describe('BrowserConfigDetailsComponent', () => {
  let component: BrowserConfigDetailsComponent;
  let fixture: ComponentFixture<BrowserConfigDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BrowserConfigDetailsComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrowserConfigDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
