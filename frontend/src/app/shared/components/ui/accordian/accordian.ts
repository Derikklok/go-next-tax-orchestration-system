import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';

export interface AccordionItem {
  id: string;
  title: string;
  description?: string;
  content: string;
  disabled?: boolean;
}

@Component({
  selector: 'app-accordion',
  standalone: true,
  imports: [CommonModule, MatExpansionModule, MatIconModule],
  templateUrl: './accordian.html',
  styleUrl: './accordian.scss',
})
export class Accordion {
  @Input() items: AccordionItem[] = [];
  @Input() multi: boolean = false;
  @Input() hideToggle: boolean = false;

  trackByItemId(index: number, item: AccordionItem): string {
    return item.id;
  }
}

