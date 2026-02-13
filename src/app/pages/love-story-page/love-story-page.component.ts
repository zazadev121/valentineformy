import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoveStoryComponent } from '../../components/love-story/love-story.component';
import { LoveLetterComponent } from '../../components/love-letter/love-letter.component';

@Component({
  selector: 'app-love-story-page',
  standalone: true,
  imports: [CommonModule, LoveStoryComponent, LoveLetterComponent],
  template: `
    <div class="page">
      <app-love-story></app-love-story>
      <app-love-letter></app-love-letter>
    </div>
  `,
  styles: [`
    .page {
      min-height: 100vh;
    }
  `]
})
export class LoveStoryPageComponent {}
