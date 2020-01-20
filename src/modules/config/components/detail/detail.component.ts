import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {ConfigObject, Kind} from '../../../../shared/models';
import {ConfigOptions} from '../../containers';
import {Parcel} from '../seed-meta/seed-meta.component';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetailComponent {
  readonly Kind = Kind;

  @Input()
  configObject: ConfigObject;

  @Input()
  options: ConfigOptions;

  @Output()
  save: EventEmitter<ConfigObject>;

  @Output()
  update: EventEmitter<ConfigObject>;

  @Output()
  delete: EventEmitter<ConfigObject>;

  @Output()
  move: EventEmitter<Parcel>;

  @Output()
  saveMultipleSeeds: EventEmitter<ConfigObject[]>;

  constructor() {
    this.save = new EventEmitter();
    this.update = new EventEmitter();
    this.delete = new EventEmitter();
    this.move = new EventEmitter<Parcel>();
    this.saveMultipleSeeds = new EventEmitter();
  }

  onSaveConfig(configObject: ConfigObject) {
    this.save.emit(configObject);
  }

  onUpdateConfig(configObject: ConfigObject) {
    this.update.emit(configObject);
  }

  onDeleteConfig(configObject: ConfigObject) {
    this.delete.emit(configObject);
  }

  onMoveSeed(parcel: Parcel) {
    this.move.emit(parcel);
  }

  onSaveMultipleSeeds(event) {
    this.saveMultipleSeeds.emit(event);
  }
}
