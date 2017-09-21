import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {CrawlconfigDetailsComponent} from './crawlconfig-details.component';

describe('CrawlconfigDetailsComponent', () => {
  let component: CrawlconfigDetailsComponent;
  let fixture: ComponentFixture<CrawlconfigDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CrawlconfigDetailsComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrawlconfigDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
