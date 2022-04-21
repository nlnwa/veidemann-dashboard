import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  forwardRef,
  Input,
  OnInit,
  ViewChild
} from '@angular/core';
import {ConfigObject} from '../../../../../shared/models/config';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {
  MonacoEditorComponent,
  MonacoEditorConstructionOptions,
  MonacoEditorLoaderService,
  MonacoStandaloneCodeEditor
} from '@materia-ui/ngx-monaco-editor';


@Component({
  selector: 'app-monaco-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => EditorComponent),
      multi: true
    }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class EditorComponent implements ControlValueAccessor, AfterViewInit, OnInit {

  @ViewChild(MonacoEditorComponent, {static: false}) editorComponent: MonacoEditorComponent;
  editorOptions: MonacoEditorConstructionOptions = {
    theme: window.matchMedia('(prefers-color-scheme: dark)').matches ? 'vs-dark' : 'vs',
    language: 'javascript',
    roundedSelection: true,
  };
  @Input()
  configObject: ConfigObject;

  editorThemes = ['vs', 'vs-dark', 'hc-black'];
  editorLanguages = ['javascript', 'typescript'];

  value = '';

  onChange: (script: string) => void;
  onTouched: (script: string) => void;

  constructor(private monacoLoaderService: MonacoEditorLoaderService, private cdr: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.getLanguage(this.configObject);
  }

  ngAfterViewInit(): void {
    this.editorComponent.registerOnChange(this.onChange);
    this.editorComponent.registerOnTouched(this.onTouched);
  }

  writeValue(script: string): void {
    this.value = script;
    if (this.editorComponent !== undefined) {
      this.editorComponent.writeValue(script);
    }
  }

  editorInit(editor: MonacoStandaloneCodeEditor) {
    if (editor) {
       editor.onDidChangeModelContent(() => {
        this.cdr.markForCheck();
      });
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
    if (this.editorComponent) {
      this.editorComponent.registerOnChange(fn);
    }
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
    if (this.editorComponent) {
      this.editorComponent.registerOnTouched(fn);
    }
  }

  onChangeTheme(theme: string) {
    this.editorOptions = {...this.editorOptions, theme};
  }

  onChangeLanguage(language: string) {
    this.editorOptions = {...this.editorOptions, language};
  }

  public getLanguage(configObject: ConfigObject) {
    const scriptName = configObject.meta.name;
    const language = scriptName.substring(scriptName.lastIndexOf('.') + 1);
    console.log('language: ', language);
    switch (language) {
      case 'js':
        this.onChangeLanguage('javascript');
        break;
      case 'ts':
        this.onChangeLanguage('typescript');
        break;
      default:
        this.onChangeLanguage('javascript');
    }
  }
}
