import { Component, Input as InputDecorator, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

type InputType = 'text' | 'email' | 'password' | 'number' | 'textarea';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [CommonModule, FormsModule, MatFormFieldModule, MatInputModule, MatIconModule],
  templateUrl: './input.html',
  styleUrl: './input.scss',
})
export class InputField {
  @InputDecorator() label: string = '';
  @InputDecorator() placeholder: string = '';
  @InputDecorator() value: string = '';
  @InputDecorator() type: InputType = 'text';
  @InputDecorator() disabled: boolean = false;
  @InputDecorator() readonly: boolean = false;
  @InputDecorator() required: boolean = false;
  @InputDecorator() error: string = '';
  @InputDecorator() hint: string = '';
  @InputDecorator() icon?: string;
  @InputDecorator() rows: number = 1;
  @InputDecorator() maxLength?: number;
  @InputDecorator() minLength?: number;

  @Output() valueChange = new EventEmitter<string>();
  @Output() blur = new EventEmitter<void>();
  @Output() focus = new EventEmitter<void>();

  onValueChange(newValue: string): void {
    this.value = newValue;
    this.valueChange.emit(newValue);
  }

  onBlur(): void {
    this.blur.emit();
  }

  onFocus(): void {
    this.focus.emit();
  }

  get isTextarea(): boolean {
    return this.type === 'textarea';
  }

  get hasError(): boolean {
    return !!this.error;
  }
}
