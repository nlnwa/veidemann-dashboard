import {NgxMonacoEditorConfig} from 'ngx-monaco-editor';

export const MonacoConfig: NgxMonacoEditorConfig = {
  baseUrl: 'assets', // configure base path for monaco editor
  defaultOptions: {scrollBeyondLastLine: false}, // pass default options to be used
  onMonacoLoad: monacoOnLoad
};

export function monacoOnLoad() {
  console.log((window as any).monaco);

  monaco.languages.register({
    id: 'json',
    extensions: ['.json', '.bowerrc', '.jshintrc', '.jscsrc', '.eslintrc', '.babelrc'],
    aliases: ['JSON', 'json'],
    mimetypes: ['application/json'],
  });

  monaco.languages.register({
    id: 'python',
    extensions: ['.py'],
    aliases: ['python'],
  });
}
