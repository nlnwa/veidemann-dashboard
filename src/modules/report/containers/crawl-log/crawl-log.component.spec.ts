import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {CrawlLogComponent} from './crawl-log.component';
import {RouterTestingModule} from '@angular/router/testing';
import {CrawlLogService} from '../../services';
import {CoreTestingModule} from '../../../core/core.testing.module';

describe('CrawlLogComponent', () => {
  let component: CrawlLogComponent;
  let fixture: ComponentFixture<CrawlLogComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [CoreTestingModule.forRoot(), RouterTestingModule],
      declarations: [CrawlLogComponent],
      providers: [
        {provide: CrawlLogService, useValue: {}}
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrawlLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
