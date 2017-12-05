import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {CrawlConfigListComponent} from './crawlconfig-list.component';

xdescribe('CrawlConfigListComponent', () => {
  let component: CrawlConfigListComponent;
  let fixture: ComponentFixture<CrawlConfigListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CrawlConfigListComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrawlConfigListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
