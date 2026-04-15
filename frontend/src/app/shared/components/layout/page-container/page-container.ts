import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-page-container',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './page-container.html',
  styleUrl: './page-container.scss',
})
export class PageContainer {
  @Input() maxWidth: string = '1200px';
  @Input() padding: string = '24px';
}
