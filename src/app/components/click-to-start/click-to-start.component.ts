import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-click-to-start',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="overlay" *ngIf="visible" (click)="start()">
      <div class="content">
        <h1>❤️</h1>
        <p>Click anywhere to start our story...</p>
      </div>
    </div>
  `,
  styles: [`
    .overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.8);
      z-index: 99999;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      color: white;
      text-align: center;
    }
    h1 { font-size: 5rem; animation: pulse 1.5s infinite; }
    p { font-size: 1.5rem; margin-top: 20px; font-family: sans-serif; }
    @keyframes pulse { 0% { transform: scale(1); } 50% { transform: scale(1.1); } 100% { transform: scale(1); } }
  `]
})
export class ClickToStartComponent {
  @Output() onStart = new EventEmitter<void>();
  visible = true;

  start() {
    this.visible = false;
    this.onStart.emit();
  }
}
