import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {PolitenessConfigListComponent} from './politenessconfig-list.component';

describe('PolitenessConfigListComponent', () => {
  let component: PolitenessConfigListComponent;
  let fixture: ComponentFixture<PolitenessConfigListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PolitenessConfigListComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PolitenessConfigListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
