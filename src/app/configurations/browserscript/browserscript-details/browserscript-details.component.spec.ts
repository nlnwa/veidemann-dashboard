import {async, ComponentFixture, TestBed} from "@angular/core/testing";
import {BrowserscriptDetailsComponent} from "./browserscript-details.component";

describe('BrowserscriptDetailsComponent', () => {
  let component: BrowserscriptDetailsComponent;
  let fixture: ComponentFixture<BrowserscriptDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BrowserscriptDetailsComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrowserscriptDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
