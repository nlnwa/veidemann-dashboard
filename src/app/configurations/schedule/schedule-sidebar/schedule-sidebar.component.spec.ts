import {async, ComponentFixture, TestBed} from "@angular/core/testing";
import {ScheduleSidebarComponent} from "./schedule-sidebar.component";

describe('ScheduleSidebarComponent', () => {
  let component: ScheduleSidebarComponent;
  let fixture: ComponentFixture<ScheduleSidebarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ScheduleSidebarComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScheduleSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
