import {ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {BrowserScriptType, ConfigObject} from '../../../../../shared/models/config';
import {MonacoEditorConstructionOptions, MonacoStandaloneCodeEditor} from '@materia-ui/ngx-monaco-editor';

@Component({
    selector: 'app-browserscript-preview',
    templateUrl: './browserscript-preview.component.html',
    styleUrls: ['./browserscript-preview.component.css'],
    standalone: false
})
export class BrowserscriptPreviewComponent implements OnInit {
  readonly BrowserScriptType = BrowserScriptType;
  @Input()
  configObject: ConfigObject;

  language: string;

  editorOptions: MonacoEditorConstructionOptions = {
    theme: window.matchMedia('(prefers-color-scheme: dark)').matches ? 'vs-dark' : 'vs',
    language: 'javascript',
    roundedSelection: true,
    readOnly: true,
    domReadOnly: true,
    contextmenu: false,
    minimap: {
      enabled: false
    }
  };

  constructor(protected cdr: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.language = this.configObject.meta.name.split('.').slice(-1)[0];
  }

  initEditor(editor: MonacoStandaloneCodeEditor) {
    editor.onDidChangeModelDecorations(() => {
      this.cdr.markForCheck();
    });
  }



}
