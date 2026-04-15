import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';

export interface CardConfig {
  title?: string;
  subtitle?: string;
  elevation?: number;
  clickable?: boolean;
}

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule, MatChipsModule],
  templateUrl: './card.html',
  styleUrl: './card.scss',
})
export class Card {
  @Input() title?: string;
  @Input() subtitle?: string;
  @Input() elevation: number = 1;
  @Input() clickable: boolean = false;
  @Input() hoverable: boolean = true;

  get cardClass(): string {
    return `card-elevation-${this.elevation}`;
  }
}
