import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroComponent } from '../../components/hero/hero.component';
import { ValentineQuestionComponent } from '../../components/valentine-question/valentine-question.component';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [CommonModule, HeroComponent, ValentineQuestionComponent],
  template: `
    <div class="page">
      <app-hero></app-hero>
      <app-valentine-question></app-valentine-question>
    </div>
  `,
  styles: [`
    .page {
      min-height: 100vh;
    }
  `]
})
export class HomePageComponent {}
