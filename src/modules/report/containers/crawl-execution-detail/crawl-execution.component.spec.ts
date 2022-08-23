import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {CrawlExecutionDetailComponent} from './crawl-execution-detail.component';
import {ActivatedRoute} from '@angular/router';

describe('CrawlExecutionComponent', () => {
  let component: CrawlExecutionDetailComponent;
  let fixture: ComponentFixture<CrawlExecutionDetailComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [ActivatedRoute],
      declarations: [CrawlExecutionDetailComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrawlExecutionDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
