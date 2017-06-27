import {async, ComponentFixture, TestBed} from "@angular/core/testing";
import {PolitenessconfigListComponent} from "./politenessconfig-list.component";

describe('PolitenessconfigListComponent', () => {
  let component: PolitenessconfigListComponent;
  let fixture: ComponentFixture<PolitenessconfigListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PolitenessconfigListComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PolitenessconfigListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
