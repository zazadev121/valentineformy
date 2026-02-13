import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoveQuizComponent } from '../../components/love-quiz/love-quiz.component';

@Component({
  selector: 'app-quiz-page',
  standalone: true,
  imports: [CommonModule, LoveQuizComponent],
  template: `
    <div class="page">
      <app-love-quiz></app-love-quiz>
    </div>
  `,
  styles: [`
    .page {
      min-height: 100vh;
      padding: 40px 0;
    }
  `]
})
export class QuizPageComponent {}
