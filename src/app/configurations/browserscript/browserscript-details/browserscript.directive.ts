import {ChangeDetectorRef, Directive, ElementRef} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

import {nanoEditor} from 'nano-editor';

@Directive({
  selector: '[appScriptEditor]',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: BrowserScriptDirective,
    multi: true
  }],
})
export class BrowserScriptDirective implements ControlValueAccessor {

  onChange: (value: string) => void;
  onTouched: any;

  private editor: nanoEditor;

  constructor(private el: ElementRef, private ref: ChangeDetectorRef) {
    console.log('Constructor');
    this.editor = new nanoEditor(el.nativeElement, 'javascript', true);
    this.editor.setLanguage('javascript');
    if (el.nativeElement.hasAttribute('disabled')) {
      this.editor.canEdit(false);
    }
  }

  // Implements ControlValueAccessor
  writeValue(value: string): void {
    if (value == null) {
      this.editor.setValue('');
    } else {
      const lines = value.split(/\r\n|\r|\n/).length;
      this.editor.container.style.minHeight = lines * 1.7 + 'em';
      this.editor.setValue(value);
    }
  }

  // Implements ControlValueAccessor
  registerOnChange(fn: any): void {
    this.onChange = fn;
    this.editor.onChange((val: string) => {
      this.onChange(val);
      this.ref.detectChanges();
    });
  }

  // Implements ControlValueAccessor
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

}
