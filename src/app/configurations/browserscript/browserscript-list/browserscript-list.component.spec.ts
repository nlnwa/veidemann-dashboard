import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {BrowserScriptListComponent} from './browserscript-list.component';

describe('BrowserscriptListComponent', () => {
  let component: BrowserScriptListComponent;
  let fixture: ComponentFixture<BrowserScriptListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BrowserScriptListComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrowserScriptListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
