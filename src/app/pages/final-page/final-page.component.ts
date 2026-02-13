import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FinalMessageComponent } from '../../components/final-message/final-message.component';

@Component({
  selector: 'app-final-page',
  standalone: true,
  imports: [CommonModule, FinalMessageComponent],
  template: `
    <div class="page">
      <app-final-message></app-final-message>
    </div>
  `,
  styles: [`
    .page {
      min-height: 100vh;
    }
  `]
})
export class FinalPageComponent {}
