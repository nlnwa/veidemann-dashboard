import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ConfigObject, Kind, ConfigRef} from '../../../../../shared/models/config';
import {Params} from '@angular/router';
import {AuthService} from '../../../../core/services/auth';

@Component({
  selector: 'app-action-shortcut',
  templateUrl: './action-shortcut.component.html',
  styleUrls: ['./action-shortcut.component.scss']
})
export class ActionShortcutComponent implements OnInit {
  readonly Kind = Kind;

  @Input()
  configObject: ConfigObject;

  @Output()
  createSeed = new EventEmitter();

  @Output()
  runCrawl = new EventEmitter();

  @Output()
  clone = new EventEmitter();


  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {
  }

  onClone() {
    this.clone.emit();
  }

  private canCreateSeed(): boolean {
    return this.authService.canCreate(Kind.SEED);
  }

  onCreateSeed() {
    this.createSeed.emit();
  }

 private  canRunCrawl(): boolean {
    return this.authService.canRunCrawl('runCrawl');
  }

  onRunCrawl() {
    this.runCrawl.emit();
  }
}

