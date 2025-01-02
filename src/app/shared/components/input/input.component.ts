import { NgClass, NgIf } from '@angular/common';
import { Component, forwardRef, input, Input, signal } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true,
    },
  ],
})
export class InputComponent {
  @Input() label = 'Label';
  @Input() type = 'text';
  @Input() id = '';
  @Input() name = '';
  @Input() placeholder = 'Placeholder';
  @Input() controller!: FormControl;

  value = signal<string>('');

  onTouched = () => {};
  onChange: (value: any) => void = () => {};


  writeValue(value: any): void {
    if (value !== undefined) {
      this.value.set(value);
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    if (isDisabled) {
      this.value.set('');
    }
  }

  onInputChange(event: any): void {
    const newValue = event.target.value;
    this.value.set(newValue);
    this.onChange(newValue);
  }

  get errors() {
    return this.controller?.errors || {};
  }

  hasError(errorKey: string): boolean {
    return this.controller?.hasError(errorKey) && this.controller?.touched;
  }

  get isValid() {
    return this.controller?.valid && this.controller?.touched;
  }

  get isInvalid() {
    return this.controller?.invalid && this.controller?.touched;
  }
}
