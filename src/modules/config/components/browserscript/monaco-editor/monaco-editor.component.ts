import {AfterViewInit, ChangeDetectionStrategy, Component, forwardRef, Input, OnInit, ViewChild} from '@angular/core';
import {ConfigObject} from '../../../../../shared/models/config';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {EditorComponent} from 'ngx-monaco-editor';
import {CloseAction, createConnection, ErrorAction, MonacoLanguageClient, MonacoServices} from 'monaco-languageclient';
import {listen, MessageConnection} from 'vscode-ws-jsonrpc';

const ReconnectingWebSocket = require('reconnecting-websocket');

@Component({
  selector: 'app-monaco-editor',
  templateUrl: './monaco-editor.component.html',
  styleUrls: ['./monaco-editor.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MonacoEditorComponent),
      multi: true
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class MonacoEditorComponent implements ControlValueAccessor, AfterViewInit, OnInit {

  @ViewChild(EditorComponent) editorComponent: EditorComponent;

  @Input()
  configObject: ConfigObject;

  editorOptions = {theme: 'vs', language: 'javascript'};
  editorThemes = ['vs', 'vs-dark', 'hc-black'];
  editorLanguages = ['javascript', 'typescript', 'python', 'starlark'];

  value = '';

  // ControlValueAccessor callbacks
  onChange: (script: string) => void;
  onTouched: (script: string) => void;

  constructor() {
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

  monacoOnInit(editor) {
    MonacoServices.install(editor);
    if (this.editorOptions.language === 'python') {
      const url = this.createUrl();
      const webSocket = this.createWebSocket(url);
      listen({
        webSocket,
        onConnection: (connection: MessageConnection) => {
          const languageClient = this.createLanguageClient(connection);
          const disposable = languageClient.start();
          connection.onClose(() => disposable.dispose());
        }
      });
    }
  }

  public createUrl(): string {
    switch (this.editorOptions.language) {
      case 'json':
        return;
      case 'javascript':
        return;
      case 'python':
        return 'ws://localhost:3001/python';
    }
  }

  public createLanguageClient(connection: MessageConnection): MonacoLanguageClient {
    return new MonacoLanguageClient({
      name: `${this.editorOptions.language.toUpperCase()} Client`,
      clientOptions: {
        documentSelector: [this.editorOptions.language],
        errorHandler: {
          error: () => ErrorAction.Continue,
          closed: () => CloseAction.DoNotRestart
        }
      },
      connectionProvider: {
        get: (errorHandler, closeHandler) => {
          return Promise.resolve(createConnection(connection as any, errorHandler, closeHandler));
        }
      }
    });
  }

  public createWebSocket(socketUrl: string): WebSocket {
    const socketOptions = {
      maxReconnectionDelay: 10000,
      minReconnectionDelay: 1000,
      reconnectionDelayGrowFactor: 1.3,
      connectionTimeout: 10000,
      maxRetries: Infinity,
      debug: false
    };
    return new ReconnectingWebSocket.default(socketUrl, [], socketOptions);
  }

  public getLanguage(configObject: ConfigObject) {
    const scriptName = configObject.meta.name;
    const language = scriptName.substring(scriptName.lastIndexOf('.') + 1);
    switch (language) {
      case 'py':
        this.onChangeLanguage('python');
        break;
      case 'star':
        this.onChangeLanguage('python');
        break;
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
