import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {BrowserConfigListComponent} from './browserconfig-list.component';

describe('BrowserConfigListComponent', () => {
  let component: BrowserConfigListComponent;
  let fixture: ComponentFixture<BrowserConfigListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BrowserConfigListComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrowserConfigListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
