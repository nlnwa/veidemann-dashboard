import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {CrawljobPreviewComponent} from './crawljob-preview.component';
import {ConfigurationsModule} from '../../../configurations.module';
import {CoreTestingModule} from '../../../../core/core.testing.module';
import {ConfigObject, Kind} from '../../../../../shared/models';
import {AuthService} from '../../../../core/services';

describe('CrawljobPreviewComponent', () => {
  let component: CrawljobPreviewComponent;
  let fixture: ComponentFixture<CrawljobPreviewComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [ConfigurationsModule, CoreTestingModule.forRoot()],
      declarations: [ CrawljobPreviewComponent ],
      providers: [{provider: AuthService, useValue: {}}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrawljobPreviewComponent);
    component = fixture.componentInstance;
    component.configObject = new ConfigObject({kind: Kind.CRAWLJOB});
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
