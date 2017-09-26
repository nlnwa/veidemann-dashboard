import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {CrawlConfigDetailsComponent} from './crawlconfig-details.component';

describe('CrawlConfigDetailsComponent', () => {
  let component: CrawlConfigDetailsComponent;
  let fixture: ComponentFixture<CrawlConfigDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CrawlConfigDetailsComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrawlConfigDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
