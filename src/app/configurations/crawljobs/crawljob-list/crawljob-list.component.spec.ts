import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {CrawlJobListComponent} from './crawljob-list.component';

xdescribe('CrawlJobListComponent', () => {
  let component: CrawlJobListComponent;
  let fixture: ComponentFixture<CrawlJobListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CrawlJobListComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrawlJobListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
