import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {BrowserScriptDetailsComponent} from './browserscript-details.component';

describe('BrowserScriptDetailsComponent', () => {
  let component: BrowserScriptDetailsComponent;
  let fixture: ComponentFixture<BrowserScriptDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BrowserScriptDetailsComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrowserScriptDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
