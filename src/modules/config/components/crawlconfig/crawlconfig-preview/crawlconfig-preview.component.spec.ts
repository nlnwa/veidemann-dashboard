import {CrawlconfigPreviewComponent} from './crawlconfig-preview.component';
import {DurationFormatPipe} from '../../../../commons/pipes/duration-format.pipe';
import {ConfigObject, Kind} from '../../../../../shared/models';
import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {MatCheckboxModule} from '@angular/material/checkbox';

describe('CrawlconfigPreviewComponent', () => {
  let component: CrawlconfigPreviewComponent;
  let fixture: ComponentFixture<CrawlconfigPreviewComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [MatCheckboxModule],
      declarations: [CrawlconfigPreviewComponent, DurationFormatPipe],
      providers: []
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrawlconfigPreviewComponent);
    component = fixture.componentInstance;
    component.configObject = new ConfigObject({kind: Kind.CRAWLCONFIG});
    fixture.detectChanges();
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
