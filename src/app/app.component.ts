import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroComponent } from './components/hero/hero.component';
import { LoveStoryComponent } from './components/love-story/love-story.component';
import { ReasonsComponent } from './components/reasons/reasons.component';
import { GalleryComponent } from './components/gallery/gallery.component';
import { ValentineQuestionComponent } from './components/valentine-question/valentine-question.component';
import { FinalMessageComponent } from './components/final-message/final-message.component';
import { MusicPlayerComponent } from './components/music-player/music-player.component';
import { ClickToStartComponent } from './components/click-to-start/click-to-start.component';

import { LoveLetterComponent } from './components/love-letter/love-letter.component';
import { LoveQuizComponent } from './components/love-quiz/love-quiz.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule, 
    HeroComponent, 
    LoveStoryComponent,
    LoveLetterComponent,
    ReasonsComponent,
    GalleryComponent,
    ValentineQuestionComponent,
    FinalMessageComponent,
    MusicPlayerComponent,
    ClickToStartComponent,
    LoveQuizComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'valentine-mariam';
  @ViewChild(MusicPlayerComponent) musicPlayer!: MusicPlayerComponent;

  onStart() {
    // Attempt to play music when user interacts
    if (this.musicPlayer) {
      this.musicPlayer.togglePlay();
    }
  }
}
