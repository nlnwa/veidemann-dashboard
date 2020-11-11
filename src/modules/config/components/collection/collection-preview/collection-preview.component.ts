import {Component, Input, OnInit} from '@angular/core';
import {ConfigObject, RotationPolicy, SubCollectionType} from '../../../../../shared/models/config';

@Component({
  selector: 'app-collection-preview',
  templateUrl: './collection-preview.component.html',
  styleUrls: ['./collection-preview.component.css']
})
export class CollectionPreviewComponent implements OnInit {
readonly RotationPolicy = RotationPolicy;
readonly SubCollectionType = SubCollectionType;

@Input()
configObject: ConfigObject;


  constructor() { }

  ngOnInit(): void {
  }

}
