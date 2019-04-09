import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {EventService} from '../../services/event.service';
import {ConfigObject, CrawlEntity, EventObject, Kind, Meta} from '../../../commons/models';
import {takeUntil} from 'rxjs/operators';
import {DataService} from '../../../configurations/services';
import {SnackBarService} from '../../../core/services';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-event-new-seed',
  templateUrl: './event-new-seed.component.html',
  styleUrls: ['./event-new-seed.component.css']
})
export class EventNewSeedComponent implements OnChanges {

  protected ngOnUnsubscribe = new Subject();

  @Input()
  eventObject: EventObject;

  form: FormGroup;

  crawlEntity: ConfigObject = null;
  seed: ConfigObject = null;

  constructor(private fb: FormBuilder,
              private eventService: EventService,
              protected snackBarService: SnackBarService) {
    this.createForm();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.eventObject) {
      if (!this.eventObject) {
        this.form.reset();
      } else {
        this.updateForm();
        this.crawlEntity = this.createCrawlEntityObject();
        this.seed = this.createSeedObject();
      }
    }
  }


  private createForm() {
    this.form = this.fb.group({
      uri: '',
      refUri: '',
      entityName: '',
      seedUri: ''
    });
  }

  get uri() {
    return this.form.get('uri').value;
  }

  get refUri() {
    return this.form.get('refUri').value;
  }

  updateForm() {
    let uri = '';
    let refUri = '';
    for (const data of this.eventObject.dataList) {
      if (data.key === 'uri') {
        uri = data.value;
      }
      if (data.key === 'referring uri') {
        refUri = data.value;
      }
    }
    this.form.patchValue({
      uri: uri,
      refUri: refUri,
    });
  }
  //
  // onToggleAddSeedToEntity() {
  //   this.createNewEntitySeed = false;
  //   if (this.addSeedToEntity) {
  //     this.addSeedToEntity = false;
  //   } else if (!this.addSeedToEntity) {
  //     this.addSeedToEntity = true;
  //   }
  // }
  //
  // onToggleCreateEntitySeed() {
  //   this.addSeedToEntity = false;
  //   if (this.createNewEntitySeed) {
  //     this.createNewEntitySeed = false;
  //   } else if (!this.createNewEntitySeed) {
  //     this.createNewEntitySeed = true;
  //   }
  // }

  createCrawlEntityObject() {
    return new ConfigObject({
      kind: Kind.CRAWLENTITY,
      id: '12345678',
      crawlEntity: new CrawlEntity()
    });
  }

  createSeedObject() {
    const formModel = this.form.value;

    return new ConfigObject({
      kind: Kind.SEED,
      meta: {
        name: formModel.uri
      }
    });
  }

  onSaveEntity(entity: ConfigObject) {
    console.log('onSaveEntity: ', entity);
    this.eventService.saveCrawlEntity(entity).pipe(takeUntil(this.ngOnUnsubscribe))
      .subscribe(newEntity => {
        this.crawlEntity = newEntity;
        this.snackBarService.openSnackBar('Ny entitet lagret');
      });
  }

  onSaveSeed(seed: ConfigObject) {
    this.eventService.saveSeed(seed).pipe(takeUntil(this.ngOnUnsubscribe))
      .subscribe(newSeed => {
        this.seed = newSeed;
        this.snackBarService.openSnackBar('Ny seed lagret');
      });
  }
}
