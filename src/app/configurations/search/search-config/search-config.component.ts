import {Component, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {MatInput} from '@angular/material';

@Component({
  selector: 'app-search-config',
  templateUrl: './search-config.component.html',
  styleUrls: ['./search-config.component.css']
})
export class SearchConfigComponent {

  @ViewChild(MatInput) input;

  @Input()
  set term(term: string) {
    this.input.value = this.input.value + ' ' + term;
  }

  @Output()
  submit = new EventEmitter<string>();

  constructor() {
  }

  onEnter(event) {
    const searchString = event.target.value;
    const labelSelectorQuery = searchString.split(',');
    this.submit.emit(labelSelectorQuery);
  }
}
