import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {CrawlExecutionStatusComponent} from './crawl-execution-status.component';
import {CommonsModule} from '../../../commons';
import {RouterTestingModule} from '@angular/router/testing';
import {CrawlExecutionStatus} from '../../../../shared/models';
import {CrawlExecutionService, JobExecutionService} from '../../services';
import {of} from 'rxjs';
import {JobNamePipe, SeedNamePipe} from '../../pipe';
import {CoreTestingModule} from '../../../core/core.testing.module';


describe('CrawlExecutionStatusComponent', () => {
  let component: CrawlExecutionStatusComponent;
  let fixture: ComponentFixture<CrawlExecutionStatusComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, CommonsModule, CoreTestingModule.forRoot()],
      declarations: [CrawlExecutionStatusComponent, SeedNamePipe, JobNamePipe],
      providers: [
        {
          provide: JobExecutionService, useValue: {
            getJob: () => of(null)
          }
        },
        {
          provide: CrawlExecutionService, useValue: {
            getSeed: () => of(null)
          }
        }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrawlExecutionStatusComponent);
    component = fixture.componentInstance;
    component.crawlExecutionStatus = new CrawlExecutionStatus();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
