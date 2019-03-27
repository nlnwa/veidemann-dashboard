import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {PolitenessConfigDetailsComponent} from './politenessconfig-details.component';

describe('PolitenessconfigDetailsComponent', () => {
  let component: PolitenessConfigDetailsComponent;
  let fixture: ComponentFixture<PolitenessConfigDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PolitenessConfigDetailsComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PolitenessConfigDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
