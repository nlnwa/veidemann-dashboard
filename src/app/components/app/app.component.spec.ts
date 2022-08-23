import {TestBed, waitForAsync} from '@angular/core/testing';
import {AppComponent} from './app.component';
import {MaterialModule} from '../../../modules/commons/material.module';
import {DialogComponent, TimeComponent} from '../index';
import {RouterTestingModule} from '@angular/router/testing';
import {AppInitializerService} from '../../../modules/core/services/app.initializer.service';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {MatDialogRef} from '@angular/material/dialog';
import {CoreTestingModule} from '../../../modules/core/core.testing.module';

describe('AppComponent', () => {
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [CoreTestingModule.forRoot(), MaterialModule, RouterTestingModule, NoopAnimationsModule],
      declarations: [
        AppComponent,
        TimeComponent,
        DialogComponent
      ],
      providers: [
        {
          provide: AppInitializerService,
          useValue: {
            initialized: true,
            error: {message: ''}
          }
        },
        {
          provide: MatDialogRef,
          useValue: {
            close: () => {}
          }
        }
      ]
    }).compileComponents();
  }));

  it('should create the app', waitForAsync(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});
