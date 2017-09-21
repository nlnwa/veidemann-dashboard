import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {CrawljobListComponent} from './crawljob-list.component';

describe('CrawljobListComponent', () => {
  let component: CrawljobListComponent;
  let fixture: ComponentFixture<CrawljobListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CrawljobListComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrawljobListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
