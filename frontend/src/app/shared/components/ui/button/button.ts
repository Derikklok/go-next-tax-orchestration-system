import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

type ButtonVariant = 'basic' | 'raised' | 'flat' | 'stroked';
type ButtonColor = 'primary' | 'accent' | 'warn';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule],
  templateUrl: './button.html',
  styleUrl: './button.scss',
})
export class Button {
  @Input() label: string = '';
  @Input() color: ButtonColor = 'primary';
  @Input() variant: ButtonVariant = 'raised';
  @Input() disabled: boolean = false;
  @Input() icon?: string;
  @Input() fullWidth: boolean = false;
  @Input() loading: boolean = false;
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  
  @Output() clicked = new EventEmitter<void>();

  onClick(): void {
    if (!this.disabled && !this.loading) {
      this.clicked.emit();
    }
  }

  get buttonClass(): string {
    return `btn-${this.variant}`;
  }
}
