import { Component, signal } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import { RouterOutlet } from '@angular/router';
import { Button } from "./shared/components/ui/button/button";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatSlideToggle, MatButton, Button],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('frontend');
}
