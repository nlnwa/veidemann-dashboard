import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {CrawlhostgroupconfigPreviewComponent} from './crawlhostgroupconfig-preview.component';
import {ConfigObject, Kind} from '../../../../../shared/models';
import {DurationFormatPipe} from '../../../../commons/pipes/duration-format.pipe';

describe('CrawlhostgroupconfigPreviewComponent', () => {
  let component: CrawlhostgroupconfigPreviewComponent;
  let fixture: ComponentFixture<CrawlhostgroupconfigPreviewComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [CrawlhostgroupconfigPreviewComponent, DurationFormatPipe]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrawlhostgroupconfigPreviewComponent);
    component = fixture.componentInstance;
    component.configObject = new ConfigObject({kind: Kind.CRAWLHOSTGROUPCONFIG});
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
