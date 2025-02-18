import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {CollectionDialogComponent} from './collection-dialog.component';
import {UntypedFormBuilder} from '@angular/forms';
import {CoreTestingModule} from '../../../../core/core.testing.module';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {ConfigObject, Kind} from '../../../../../shared/models';
import {ConfigDialogData} from '../../../func';
import {MatIconModule} from '@angular/material/icon';
import {CommonsModule} from '../../../../commons';
import {AnnotationComponent, FilesizeInputComponent, LabelComponent, MetaComponent} from '../..';
import {LabelService} from '../../../services';
import {of} from 'rxjs';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {AuthService} from '../../../../core/services';
import {CollectionMetaComponent} from '../../collection-meta/collection-meta.component';

describe('CollectionDialogComponent', () => {
  let component: CollectionDialogComponent;
  let fixture: ComponentFixture<CollectionDialogComponent>;

  const configobject = new ConfigObject({
    kind: Kind.COLLECTION
  });

  const MY_CONF: ConfigDialogData = {
    configObject: configobject,
    options: {}
  };

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [CommonsModule, CoreTestingModule.forRoot(), MatDialogModule, MatIconModule, NoopAnimationsModule],
      declarations: [CollectionDialogComponent, CollectionMetaComponent, FilesizeInputComponent, LabelComponent, AnnotationComponent],
      providers: [UntypedFormBuilder,
        {
          provide: LabelService,
          useValue: {
            getLabelKeys: () => of([])
          }
        },
        {
          provide: AuthService, useValue: {
            canEdit: () => true,
            canUpdate: () => true
          }
        },
        {provide: MAT_DIALOG_DATA, useValue: MY_CONF},
        {provide: MatDialogRef, useValue: {}},
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CollectionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
