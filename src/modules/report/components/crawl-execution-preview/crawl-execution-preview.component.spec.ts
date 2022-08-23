import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {CrawlExecutionPreviewComponent} from './crawl-execution-preview.component';
import {CrawlExecutionStatus} from '../../../../shared/models';
import {NgxFilesizeModule} from 'ngx-filesize';
import {MatCardModule} from '@angular/material/card';
import {NGX_ECHARTS_CONFIG, NgxEchartsModule} from 'ngx-echarts';
import {CommonsModule} from '../../../commons';
import {CoreTestingModule} from '../../../core/core.testing.module';

describe('CrawlExecutionPreviewComponent', () => {
  let component: CrawlExecutionPreviewComponent;
  let fixture: ComponentFixture<CrawlExecutionPreviewComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [CrawlExecutionPreviewComponent],
      imports: [CoreTestingModule.forRoot(), NgxFilesizeModule, NgxEchartsModule, CommonsModule],
      providers: [
        {
          provide: NGX_ECHARTS_CONFIG,
          useValue: {}
        }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrawlExecutionPreviewComponent);
    component = fixture.componentInstance;
    component.crawlExecutionStatus = new CrawlExecutionStatus();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
