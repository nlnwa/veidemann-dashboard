import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {CrawlExecutionStatusComponent} from './crawl-execution-status.component';
import {CrawlExecutionStatus} from '../../../../shared/models';
import {RouterTestingModule} from '@angular/router/testing';
import {MatExpansionPanel} from '@angular/material/expansion';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {CommonsModule} from '../../../commons';

describe('CrawlExecutionStatusComponent', () => {
  let component: CrawlExecutionStatusComponent;
  let fixture: ComponentFixture<CrawlExecutionStatusComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [CommonsModule, RouterTestingModule, NoopAnimationsModule],
      declarations: [CrawlExecutionStatusComponent],
      providers: [MatExpansionPanel]
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
