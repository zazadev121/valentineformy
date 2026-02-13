import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReasonsComponent } from '../../components/reasons/reasons.component';

@Component({
  selector: 'app-reasons-page',
  standalone: true,
  imports: [CommonModule, ReasonsComponent],
  template: `
    <div class="page">
      <app-reasons></app-reasons>
    </div>
  `,
  styles: [`
    .page {
      min-height: 100vh;
      padding: 40px 0;
    }
  `]
})
export class ReasonsPageComponent {}
